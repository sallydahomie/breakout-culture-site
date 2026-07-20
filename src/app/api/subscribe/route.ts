import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json(
      {
        error:
          "Mailchimp is not configured. Add MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID to .env.local to enable signups.",
      },
      { status: 500 }
    );
  }

  const { email, tag } = (await request.json()) as {
    email?: string;
    tag?: string;
  };

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const dataCenter = apiKey.split("-").pop();
  const baseUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}`;
  const subscriberHash = createHash("md5").update(email.toLowerCase()).digest("hex");
  const authHeaders = {
    Authorization: `apikey ${apiKey}`,
    "Content-Type": "application/json",
  };

  // PUT upserts the member: creates them if new, and leaves an existing
  // member's status/tags alone if they're already on the list — unlike
  // POST, which errors with "Member Exists" on any repeat signup.
  const memberResponse = await fetch(`${baseUrl}/members/${subscriberHash}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
    }),
  });

  const memberData = await memberResponse.json();

  if (!memberResponse.ok) {
    return NextResponse.json(
      { error: memberData.detail || "Something went wrong. Please try again." },
      { status: memberResponse.status }
    );
  }

  // Applying the tag is a separate call so it always runs — for brand-new
  // signups and repeat ones (e.g. someone who signed up for the Tee coming
  // back to sign up for the Cap too).
  if (tag) {
    const tagResponse = await fetch(`${baseUrl}/members/${subscriberHash}/tags`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ tags: [{ name: tag, status: "active" }] }),
    });

    if (!tagResponse.ok) {
      const tagData = await tagResponse.json().catch(() => ({}));
      return NextResponse.json(
        {
          error:
            tagData.detail || "Signed up, but couldn't apply the product tag.",
        },
        { status: tagResponse.status }
      );
    }
  }

  return NextResponse.json({ ok: true });
}

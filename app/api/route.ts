import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache'


  async function createGuest() {
    const res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new`, {
        headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTdhYmViMmI4ODRiNWMyZWM0NmFjOWVhMmJjY2ZkMSIsIm5iZiI6MTcxOTI4NDEwNy43NjAxNjMsInN1YiI6IjY2N2EzMGJjNGFmOTM1YTgwY2Y2OTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BYxyk2Wyu7uN44FwhqiRzrdSTcqmV_DL3VI8YXBRFLk`
        }
    }
    )
    if (!res.ok) {
        throw new Error('Failed to create guest session')
    }
    return res.json();
  }

export async function GET(
    req: NextRequest,
    res: NextResponse
    ) {
    const sessionID = cookies().get('sessionID')?.value
    if (sessionID) {
        return Response.json({ 'sessionID': sessionID })
    } else {
        const guestID = await createGuest()
        const validUntil = new Date(guestID.expires_at);
        cookies().set('sessionID', guestID.guest_session_id, { httpOnly: true, expires: validUntil})
        return NextResponse.json({ 'sessionID': guestID.guest_session_id })
    }
}


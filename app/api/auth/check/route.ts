import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    const adminStatus = isAdmin();
    
    return NextResponse.json({ 
      isAdmin: adminStatus 
    });
  } catch (error) {
    return NextResponse.json({ 
      isAdmin: false 
    });
  }
}

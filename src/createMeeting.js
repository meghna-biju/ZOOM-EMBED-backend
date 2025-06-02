import axios from 'axios';
import { getZoomAccessToken } from './zoomToken.js';


export async function createZoomMeeting() {
  const token = await getZoomAccessToken();
  if (!token) return;
  try {
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: 'Instant Meeting',
        type: 1, 
        settings: {
            join_before_host: true,
            approval_type: 0,
            approval_type: 0,
            host_video: true,
            participant_video: true
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('✅ Meeting Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Create Meeting Error:', error.response?.data || error.message);
  }
}



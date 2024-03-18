import axios from 'axios';

const apiUrl = 'http://13.48.136.54:8000/api/api-code/';
const authToken = 'c254f87f-f4a9-4eeb-be38-204e77ea61f9';

async function postData(data: any) {
    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default postData;
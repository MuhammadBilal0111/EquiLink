// import axios from 'axios'

// const SendBirdApplicationId=import.meta.env.VITE_SENDBIRD_APP_ID
// const SendBirdApiToken=import.meta.env.VITE_SENDBIRD_API_TOKEN;


// const SENDBIRD_BASE_URL = `https://api-${SendBirdApplicationId}.sendbird.com/v3`;

// // Function to check if a user exists in SendBird
// export const CheckSendBirdUser = async (userId) => {
//   try {
//     const response = await axios.get(`${SENDBIRD_BASE_URL}/users/${userId}`, {
//       headers: {
//         "Api-Token": SendBirdApiToken,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.status === 200) {
//       return true; // User exists
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       return false; // User does not exist
//     }
//     console.error("Error checking SendBird user:", error);
//     throw error;
//   }
// };

// // Function to create a new user in SendBird
// export const CreateSendBirdUser = async (userId, userName, profileImage) => {
//   try {
//     const response = await axios.post(
//       `${SENDBIRD_BASE_URL}/users`,
//       {
//         user_id: userId,
//         nickname: userName,
//         profile_url: profileImage || "",
//       },
//       {
//         headers: {
//           "Api-Token": SendBirdApiToken,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error creating SendBird user:", error);
//     throw error;
//   }
// };

// // Function to create a chat channel between users
// export const CreateSendBirdChannel = async (userIds, pitchTitle) => {
//   try {
//     const response = await axios.post(
//       `${SENDBIRD_BASE_URL}/group_channels`,
//       {
//         name: pitchTitle,
//         user_ids: userIds,
//         is_distinct: true,
//       },
//       {
//         headers: {
//           "Api-Token": SendBirdApiToken,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error creating SendBird channel:", error);
//     throw error;
//   }
// };


// export const GetSendBirdUserChannels = async (userId) => {
//     try {
//       const response = await axios.get(
//         `${SENDBIRD_BASE_URL}/users/${userId}/my_group_channels`, 
//         {
//           headers: {
//             "Api-Token": SendBirdApiToken,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data.channels;
//     } catch (error) {
//       console.error("Error fetching SendBird user channels:", error);
//       return [];
//     }
//   };

export const APP_ID =import.meta.env.VITE_SENDBIRD_APP_ID
// set your own USER_ID and NICKNAME
export const USER_ID = "hello"
export const NICKNAME = 'Sendbirdian84'

export default {
  APP_ID,
  USER_ID,
  NICKNAME,
}
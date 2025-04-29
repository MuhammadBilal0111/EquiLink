// // import React, { useEffect, useState } from 'react';
// // import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
// // import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
// // import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
// // import { useSendbirdStateContext } from "@sendbird/uikit-react";
// // import '@sendbird/uikit-react/dist/index.css';

// // import { useLocation } from "react-router-dom";

// // const Messages = () => {
// //   const location = useLocation();
// //   const { entrepreneurId, investorId, pitchTitle, pitchImage } = location.state || {};
// //   console.log("From Messages", entrepreneurId, investorId, pitchTitle, pitchImage);

// //   const [channelUrl, setChannelUrl] = useState(null);
// //   if (!investorId) return <p>Invalid user.</p>;


// //   return (
// //     <div className='ml-[17%] w-[85vw] h-[100vh]'>
// //       <SendbirdProvider appId={import.meta.env.VITE_SENDBIRD_APP_ID} userId={investorId} nickname={pitchTitle} profileUrl={pitchImage} allowProfileEdit={true}>
// //         <div className='grid grid-cols-1 md:grid-cols-3 h-full'>
// //           {/* Channel List */}
// //           <div>
// //             {/* <GroupChannelList onChannelSelect={(channel)=>{
// //           setChannelUrl(channel?.url)
// //         }}
// //         channelListQueryParams={
// //           {
// //             includeEmpty:true,
// //           }
// //         } /> */}
// //             <GroupChannelList
// //               onChannelSelect={(channel) => {
// //                 console.log("Selected Channel:", channel);
// //                 setChannelUrl(channel?.url);
// //               }}
// //               channelListQueryParams={{
// //                 includeEmpty: true,
// //                 memberStateFilter: "all",
// //               }}
// //               renderChannelPreview={(props) => {
// //                 console.log("Fetched Channel:", props.channel);
// //                 return <div>{props.channel.name}</div>;
// //               }}
// //             />

// //           </div>
// //           {/* Chat Area */}

// //           <div className='md:col-span-2'><GroupChannel channelUrl={channelUrl} /></div>

// //         </div>
// //       </SendbirdProvider>
// //     </div>
// //   );
// // };

// // export default Messages;





// import React, { useEffect, useState } from 'react';
// import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
// import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
// import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
// import { useLocation } from "react-router-dom";
// import '@sendbird/uikit-react/dist/index.css';
// import axios from 'axios';

// const Messages = () => {
//   const location = useLocation();
//   const { entrepreneurId, investorId, pitchTitle, pitchImage } = location.state || {};
//   console.log("From Messages", entrepreneurId, investorId, pitchTitle, pitchImage);

//   const SendBirdApplicationId=import.meta.env.VITE_SENDBIRD_APP_ID
//   const SendBirdApiToken=import.meta.env.VITE_SENDBIRD_API_TOKEN;
//   const SENDBIRD_BASE_URL = `https://api-${SendBirdApplicationId}.sendbird.com/v3`;

//   const [channelUrl, setChannelUrl] = useState(null);
//   const [channels, setChannels] = useState([]);

//   if (!investorId) return <p>Invalid user.</p>;

//   // Fetch user channels
//   useEffect(() => {
//     const fetchChannels = async () => {
//       try {
//         const response = await axios.get(
//           `${SENDBIRD_BASE_URL}/users/${entrepreneurId}/my_group_channels`,
//           {
//             headers: {
//               "Api-Token": import.meta.env.VITE_SENDBIRD_API_TOKEN,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log("Fetched Channels:", response.data);
//         setChannels(response.data.channels || []);
//       } catch (error) {
//         console.error("Error fetching SendBird user channels:", error);
//       }
//     };
    
//     fetchChannels();
//   }, []);

//   return (
//     <div className='ml-[17%] w-[85vw] h-[100vh]'>
//       <SendbirdProvider 
//         appId={import.meta.env.VITE_SENDBIRD_APP_ID} 
//         userId={investorId} 
//         nickname={pitchTitle} 
//         profileUrl={pitchImage} 
//         allowProfileEdit={true}
//       >
//         <div className='grid grid-cols-1 md:grid-cols-3 h-full'>
//           {/* Channel List */}
//           <div>
//             <GroupChannelList
//               onChannelSelect={(channel) => {
//                 console.log("Selected Channel:", channel.channel_url);
//                 setChannelUrl(channel?.channel_url);
//               }}
//               channelListQueryParams={{ includeEmpty: true }}

//               renderChannelPreview={(props) => {
//                 console.log("Rendering Channel:", props.channel);
//                 return <div>{props.channel.name}</div>;
//               }}
//             />
//           </div>

//           {/* Chat Area */}
//           <div className='md:col-span-2'>
//             {channelUrl ? <GroupChannel channelUrl={channelUrl} /> : <p>Select a channel to start chatting</p>}
//           </div>
//         </div>
//       </SendbirdProvider>
//     </div>
//   );
// };

// export default Messages;





// import React, { useEffect, useState } from 'react';
// import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
// import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
// import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
// import { useSendbirdStateContext } from "@sendbird/uikit-react";
// import '@sendbird/uikit-react/dist/index.css';

// import { useLocation } from "react-router-dom";

// const Messages = () => {
//   const location = useLocation();
//   const { entrepreneurId, investorId, pitchTitle, pitchImage } = location.state || {};
//   console.log("From Messages", entrepreneurId, investorId, pitchTitle, pitchImage);

//   const [channelUrl, setChannelUrl] = useState(null);
//   if (!investorId) return <p>Invalid user.</p>;


//   return (
//     <div className='ml-[17%] w-[85vw] h-[100vh]'>
//       <SendbirdProvider appId={import.meta.env.VITE_SENDBIRD_APP_ID} userId={investorId} nickname={pitchTitle} profileUrl={pitchImage} allowProfileEdit={true}>
//         <div className='grid grid-cols-1 md:grid-cols-3 h-full'>
//           {/* Channel List */}
//           <div>
//             {/* <GroupChannelList onChannelSelect={(channel)=>{
//           setChannelUrl(channel?.url)
//         }}
//         channelListQueryParams={
//           {
//             includeEmpty:true,
//           }
//         } /> */}
//             <GroupChannelList
//               onChannelSelect={(channel) => {
//                 console.log("Selected Channel:", channel);
//                 setChannelUrl(channel?.url);
//               }}
//               channelListQueryParams={{
//                 includeEmpty: true,
//                 memberStateFilter: "all",
//               }}
//               renderChannelPreview={(props) => {
//                 console.log("Fetched Channel:", props.channel);
//                 return <div>{props.channel.name}</div>;
//               }}
//             />

//           </div>
//           {/* Chat Area */}

//           <div className='md:col-span-2'><GroupChannel channelUrl={channelUrl} /></div>

//         </div>
//       </SendbirdProvider>
//     </div>
//   );
// };

// export default Messages;





import React, { useEffect, useState } from 'react';
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { useLocation } from "react-router-dom";
import SBConversation from '@sendbird/uikit-react/GroupChannel'
import SBChannelList from '@sendbird/uikit-react/GroupChannelList'
import SBChannelSettings from '@sendbird/uikit-react/ChannelSettings'
import '@sendbird/uikit-react/dist/index.css';
import axios from 'axios';

const Messages = () => {
  const location = useLocation();
  const { entrepreneurId, investorId, pitchTitle, pitchImage } = location.state || {};
  console.log("From Messages", entrepreneurId, investorId, pitchTitle, pitchImage);

  const SendBirdApplicationId=import.meta.env.VITE_SENDBIRD_APP_ID
  const SendBirdApiToken=import.meta.env.VITE_SENDBIRD_API_TOKEN;
  const SENDBIRD_BASE_URL = `https://api-${SendBirdApplicationId}.sendbird.com/v3`;

  const [showSettings, setShowSettings] = useState(false)
  const [currentChannelUrl, setCurrentChannelUrl] = useState('')

  if (!investorId) return <p>Invalid user.</p>;

  return (
    <div className='ml-[17%] w-[85vw] h-[100vh]'>
      <SendbirdProvider 
        appId={import.meta.env.VITE_SENDBIRD_APP_ID} 
        userId={investorId} 
        nickname={pitchTitle} 
        profileUrl={pitchImage} 
        allowProfileEdit={true}
      >
        <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            selectedChannelUrl={currentChannelUrl}
            onChannelCreated={(channel) => {
              setCurrentChannelUrl(channel.url)
            }}
            onChannelSelect={(channel) => {
              setCurrentChannelUrl(channel?.url)
            }}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true)
            }}
          />
        </div>
      </div>
      {showSettings && (
        <div className="sendbird-app__settingspanel-wrap">
          <SBChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false)
            }}
          />
        </div>
      )}
    </div>
      </SendbirdProvider>
    </div>
  );
};

export default Messages;


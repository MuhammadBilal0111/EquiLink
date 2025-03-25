import React, { useState } from 'react';
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import '@sendbird/uikit-react/dist/index.css';
import { useLocation } from "react-router-dom";

const Messages = () => {
  const location = useLocation();
  const { entrepreneurId, investorId, pitchTitle, pitchImage } = location.state || {};
  console.log("From Messages", entrepreneurId, investorId, pitchTitle, pitchImage);

  const [channelUrl, setChannelUrl] = useState(null);
  if (!investorId) return <p>Invalid user.</p>;


  return (
    <div className='ml-[17%] w-[85vw] h-[100vh]'>
      <SendbirdProvider appId={import.meta.env.VITE_SENDBIRD_APP_ID} userId={investorId} nickname={pitchTitle} profileUrl={pitchImage} allowProfileEdit={true}>
        <div className='grid grid-cols-1 md:grid-cols-3 h-full'>
          {/* Channel List */}
          <div>
            {/* <GroupChannelList onChannelSelect={(channel)=>{
          setChannelUrl(channel?.url)
        }}
        channelListQueryParams={
          {
            includeEmpty:true,
          }
        } /> */}
            <GroupChannelList
              onChannelSelect={(channel) => {
                console.log("Selected Channel:", channel);
                setChannelUrl(channel?.url);
              }}
              channelListQueryParams={{
                includeEmpty: true,
                memberStateFilter: "all",
              }}
              renderChannelPreview={(props) => {
                console.log("Fetched Channel:", props.channel);
                return <div>{props.channel.name}</div>;
              }}
            />

          </div>
          {/* Chat Area */}

          <div className='md:col-span-2'><GroupChannel channelUrl={channelUrl} /></div>

        </div>
      </SendbirdProvider>
    </div>
  );
};

export default Messages;

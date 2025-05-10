import React, { useState } from 'react';
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import '@sendbird/uikit-react/dist/index.css';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const Messages = () => {
  const location = useLocation();
  const { authUser } = useSelector((state) => state.userStore)
  console.log(authUser);
  console.log("Sendbird App ID:", import.meta.env.VITE_SENDBIRD_APP_ID);

  const [channelUrl, setChannelUrl] = useState(null);
  // if (!investorId) return <p>Invalid user.</p>;


  return (
    <div className='ml-[17%] w-[85vw] h-[100vh]'>
      <SendbirdProvider appId={import.meta.env.VITE_SENDBIRD_APP_ID} userId={authUser?.user?.email.split("@")[0]} nickname={authUser?.user?.name} allowProfileEdit theme="dark">
        <div className='flex h-full'>
          {/* Channel List */}
          <div className='overflow-hidden'>
            <GroupChannelList
              onChannelSelect={(channel) => {
                console.log("Selected Channel:", channel);
                setChannelUrl(channel?.url);
              }}
              channelListQueryParams={{
                includeEmpty: true,
                memberStateFilter: "all",
                showMember: true,
              }}
            />
          </div>
          <div className='w-[70%]'>
          {/* Chat Area */}
          {channelUrl ? (
              <GroupChannel channelUrl={channelUrl} />
          ) : (
            <div className="flex items-center justify-center h-full col-span-2 text-gray-500">
              Select a channel to start chatting
            </div>
          )}
        </div>
        </div>
      </SendbirdProvider>
    </div>
  );
};

export default Messages;


type BroadcastChannelName = 'slide_show_channel';

const broadcastChannelManager = {
    getChannel: (name: BroadcastChannelName) => {
        const broadcastChannel = new BroadcastChannel(name);
        return broadcastChannel;
    },
};

export default broadcastChannelManager;

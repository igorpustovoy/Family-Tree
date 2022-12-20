import useDrawerStore from "@/stores/DrawerStore";

const useChat = (participants: string[]) => {
  const drawer = useDrawerStore();
  const activeConversation = drawer.getActiveConversation([...participants]);

  if (activeConversation) {
    return;
  }

  const conversation = drawer.getConversation([...participants]);

  if (conversation) {
    drawer.addActiveConversation(conversation);
  } else {
    drawer.addActiveConversation({
      participants: [...participants],
      messages: [],
    });
  }
};

export default useChat;

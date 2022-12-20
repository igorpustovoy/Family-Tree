import useAuthStore from "@/stores/AuthStore";

const useOtherUser = () => {
  const getOtherUser = (participants: string[]) => {
    const auth = useAuthStore();

    const user = participants.find(
      (participant) => participant !== auth.username
    ) as string;

    return user;
  };

  return getOtherUser;
};

export default useOtherUser;

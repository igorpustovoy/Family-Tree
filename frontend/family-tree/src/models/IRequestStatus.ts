interface IRequestStatus {
  status: "idle" | "pending" | "success" | "error";
  message: string;
}

export default IRequestStatus;

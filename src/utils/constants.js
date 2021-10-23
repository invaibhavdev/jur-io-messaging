// holds static values

export const HomePageConstants = {
  headerText: "Let us know who you are",
  continueButtonText: "Continue",
  contactCardDefaultAbout: "Hey there! I’m using Jur chat",
  contactCardDefaultAvatar: (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_198:1832)">
        <path
          d="M7.33337 40.6667C7.33337 34.4167 15.6667 34.4167 19.8334 30.25C21.9167 28.1667 15.6667 28.1667 15.6667 17.75C15.6667 10.8063 18.4438 7.33337 24 7.33337C29.5563 7.33337 32.3334 10.8063 32.3334 17.75C32.3334 28.1667 26.0834 28.1667 28.1667 30.25C32.3334 34.4167 40.6667 34.4167 40.6667 40.6667"
          stroke="black"
          stroke-linecap="round"
        />
      </g>
      <path
        d="M24 47C11.2975 47 1 36.7025 1 24H-1C-1 37.8071 10.1929 49 24 49V47ZM47 24C47 36.7025 36.7025 47 24 47V49C37.8071 49 49 37.8071 49 24H47ZM24 1C36.7025 1 47 11.2975 47 24H49C49 10.1929 37.8071 -1 24 -1V1ZM24 -1C10.1929 -1 -1 10.1929 -1 24H1C1 11.2975 11.2975 1 24 1V-1Z"
        fill="black"
      />
      <defs>
        <clipPath id="clip0_198:1832">
          <path
            d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  ),
};

export const SelectContactsConstants = {
  topHeaderText: "Welcome $$value$$",
  topSubHeaderText: "You don't have any conversations",
  headerText: "Select contacts to message",
  continueButtonText: "Continue",
};

export const StartConversationConstants = {
  topHeaderText: "Welcome $$user$$",
  topSubHeaderText:
    "Give title to start a new conversation with $$value$$ participants",
  continueButtonText: "Start Conversation",
};

export const ConversationPage = {
  sendButtonText: "Send",
};

export const apiURL = process.env.REACT_APP_API_BASE_URL;

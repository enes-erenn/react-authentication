import { getGoogleOAuthUrl } from "../utils/getGoogleOAuthUrl";

export const getGoogleOAuthUrlRoute = {
  path: "/auth/google/url",
  method: "get",
  handler: (req, res) => {
    // Google Accounts Url to chose one of them
    const url = getGoogleOAuthUrl();
    res.status(200).json({ url });
  },
};

interface Email {
  fullName: string;
  image?: string;
  country?: string;
  verified: boolean;
  phone?: string;
}

interface Github {
  fullName: string;
  image: string;
  country: string;
  username: string;
  followers: string;
  bio: string;
}

interface Google {
  fullName: string;
  image: string;
}

interface Linkedin {
  fullName: string;
  image?: string;
}

interface Twitter {
  fullName: string;
  image: string;
  username: string;
  followers?: string;
}

interface Facebook {
  fullName: string;
  image: string;
}

type AccountCard = Email | Github | Google | Linkedin | Twitter | Facebook;

interface UserAccounts {
  email?: Email;
  github?: Github;
  google?: Google;
  linkedin?: Linkedin;
  facebook?: Facebook;
  twitter?: Twitter;
}

interface User {
  email: string;
  userAccounts: UserAccounts;
}

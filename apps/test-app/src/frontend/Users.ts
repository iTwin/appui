/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { config } from "./config";

export interface User {
  displayName: string;
  email: string;
  givenName: string;
  surname: string;
}

export interface UserResponseBody {
  user: User;
}

export namespace Users {
  export async function fetchMe(accessToken: string) {
    if (!accessToken) return undefined;
    const response = await fetch(
      `https://${config.urlPrefix}api.bentley.com/users/me`,
      {
        headers: {
          authorization: accessToken,
        },
      }
    );
    const json: UserResponseBody = await response.json();
    return json.user;
  }
}

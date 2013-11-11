/**
 * Created by jimmy on 11/11/13.
 */
'use strict';

angular.module('mockedGetInitApplication', [])
  .value('defaultInitJSON', {
    appId: "123456",
    url: "http://localhost/deezer/get_channel"
  })
  .value('defaultDeezerJSONs', {
    notConnectedUserJSON: {
      status: "notConnected"
    },
    unknownUserJSON: {
      status: "unknown"
    },
    unAuthorizeUserJSON: {
      authResponse: { accessToken: "abcdefghijklmnopqrstuvwxyz", expire: 3575},
      status: "not_authorized",
      userID: "123456789"
    },
    connectedUserJSON: {
      authResponse: { accessToken: "abcdefghijklmnopqrstuvwxyz", expire: 3575},
      status: "connected",
      userID: "123456789"
    }
  });

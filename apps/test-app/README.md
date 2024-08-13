# AppUI Test App

## About this Application

The application contained within this directory provides a test environment for developers working on react based AppUI functionality of iTwin.js and only allow access to local files. It is `not` intended to serve as an example or template for the design of "real" iTwin.js applications.

## Getting Started

The application may be run as an Electron app, Mobile app or within a browser. The following steps outline the procedure for successfully building the application as part of a larger monorepo, and then starting the application via npm scripts.

1. To get started, follow the instructions to setup the entire repository, located [here](../../../README.md#build-instructions).
2. Optionally, set other environment variables to configure the application prior to startup. The full list of supported variable are [below](#environment-variables).
3. There are two ways to start the application:

- In Electron:

  ```cmd
  cd apps/test-app
  npm run start
  ```

- In a browser:

  ```cmd
  cd apps/test-app
  npm run start:servers
  ```

## Environment Variables

You can set environment variables to alter the default behavior of various aspects of the application. To set the environment variables create a `.env` file in the `apps/test-app` directory. For a full list of variables see the [.env.template](.env.template) section below.

### URL parameters

_Optionally_ used to load an application in a specific configuration:

- `strict` - allows disabling of `React.StrictMode` if `0` is specified. I.e. <http://localhost:3000/?strict=0>
- `menu` - allows disabling the rendering of menus if `0` is specified. I.e. <http://localhost:3000/?menu=0>
- `frontstageId` - opens a frontstage by specified frontstage id, uses a blank connection. I.e. <http://localhost:3000/blank?frontstageId=widget-api>

Preview features:

- `reparentPopoutWidgets` - overrides if the preview feature is enabled: `0` | `1`. I.e. <http://localhost:3000/?reparentPopoutWidgets=1>

# Amplience Demostore Core Package

`dc-demostore-core` is a React/Material/NextJS front-end e-Commerce application, implemented with Typescript, showcasing Amplience Dynamic Media and Dynamic Content.

It includes Storybook, a visual documentation of the UI components, things like Product Lists, Banners, Blogs & Blog posts, Stores, etc.

The package also includes a Debug/X-Ray panel to help understand how the pages and components are structured, what context you are looking at the application in and the ability to click directly from the application to the related content in Amplience Dynamic Content.

`dc-demostore-core` is intended for DEMO PURPOSES ONLY, and _not_ for production-optimized environments.

# Table of Contents

-   [Getting Started](#getting-started)
-   [Storybook](#storybook)
-   [Provisioning your own Amplience Environment](#provisioning-your-own-amplience-environment)
-   [Additional Topics](#additional-topics)

# Getting Started

## Dependency versions

This demo application was developed and tested with:

-   Node version `20.x`

## General Use (w/o Amplience account)

Out of the box, `dc-demostore-core` may be used without needing to have an Amplience account, allowing you to experiment with API calls and Front-End customisations against an existing content base. You can simply clone this repository and it already points to a working account so that you can see:

-   Live Content
-   Components
-   Amplience API requests
-   etc.

The following commands will install `dc-demostore-core` on your local machine.

```sh
$ gh repo clone amplience/dc-demostore-core
$ cd dc-demostore-core
$ nvm use
$ npm install
```

### To run a Development environment:

```sh
$ nvm use
$ npm run dev
```

### To run a production environment:

```sh
$ nvm use
$ npm run build
$ npm run start
```

Both dev and prod commands will also start a localhost. Then go to [http://localhost:3000](http://localhost:3000)

![Amplience Demo Store homepage](media/homepage.png)

# Storybook

Firing up Storybook is super simple:

```sh
$ nvm use
$ npm run storybook
```

Then go to http://localhost:6006. More details may be found in our [Storybook README](docs/Storybook.md)

![Storybook documentation](media/storybook.png)

# Provisioning your own Amplience Environment

The main tool for using your own Amplience environment with `dc-demostore-core` is [`dc-demostore-cli`](https://github.com/amplience/dc-demostore-cli). The CLI tool allows you to quickly import a pre-configured set of Content Schemas, Content Types, Images, etc. to your Amplience acount. Basically, everything you'd see running `dc-demostore-core` OOTB against our 'core public' Amplience Environment.

At a high level the basic steps are:

1. [Request an Amplience Demostore Account (if you don't already have one)](#requesting-an-amplience-demo-store-environment)
2. [Optionally request an Algolia account (if you don't already have one)](#requesting-an-algolia-account-optional)
3. [Deploy a fork of `dc-demostore-core` (we'll cover deploying on Vercel)](#fork--deploy-dc-demostore-core)
4. Configure & use `dc-demostore-cli` to populate content
5. Update your local / deployed `dc-demostore-core` with environment variables to your account.

> Note: If you already have an Amplience Demostore account and are upgrading to version `1.4.0` or later, you should upload the rendering templates for Stylitics components into your Content Hub.

Location: `examples/crs`
Upload asset store in Content Hub: `Templates`

## Requesting an Amplience Demo Store Environment

This application is setup to run with a predefined Amplience account structure to have all of the capabilities and organisational requirements to showcase capabilities effectively.

This section assumes you are already an Amplience partner, customer, or internal Amplience team member with access to the Amplience Support Center. IF the answer to any one of these is yes, [go here for instructions on requesting a Demo Store Environment](docs/DemoEnvironmentRequest.md)

If you already have a Dynamic Content and Dynamic Media instance, you can skip to the [next step](#fork--deploy-dc-demostore-core).

## Requesting an Algolia Account (Optional)

This application can also automate Blog content into Algolia to be searchable and retrieved dynamically. This is not mandatory and the application will fall back to blogs being surfaced by the Amplience Filter API if you do not wish to use Algolia.

If you do wish to include Algolia, you will need access to an account

-   Amplience Advanced Content Search
-   If you already have an Algolia account directly, then you can use that account.
-   Sign up for a free trial on [Algolia's website](https://www.algolia.com).

You will need your:

-   Application ID
-   Write Key
-   Search Key

When automating in adding an environment via the demostore-cli, you have the option to supply Algolia credentials. If they are available then indexes, records and your configuration for the demostore app will be automated as part of this.

## Fork & Deploy `dc-demostore-core`

Go [HERE for some basic instructions](docs/ForkDeploy.md) on Forking and deploying core.

## Configure & Use `dc-demostore-cli`

Please refer directly to the [this README on how to Install/Configure/Use the CLI tool](https://github.com/amplience/dc-demostore-cli)

Once you have installed the `demostore` CLI tool, you can provision your account in two easy steps:

1. Register your instance using the CLI command `env add`

```sh
% demostore env add
✔ env name: · mydcinstance
✔ app deployment url: · https://mydomain.com
✔ cms client id: · zzzzzzzz-yyyy-yyyy-yyyy-xxxxxxxxxxxx
✔ cms client secret: · ****************************************************************
✔ cms hub id: · xxxxxxxxxxxxxxx
✔ dam username: · youremail@domain.com
✔ dam password: · ********
info: [ amprsatest ] configure dc-cli...
info: [ amprsatest ] environment active
info: run [ env,add ]: started at Mon Mar 28 2022 12:39:21 GMT+0200 (Central European Summer Time)
```

2. You can provision your instance using the CLI command `import` [(more information on the CLI tool project page)](https://github.com/amplience/dc-demostore-cli):

```sh
% demostore import --latest
info: run [ import ]: started at XXX XXX XX XXXX XX:XX:XX GMT+0200 (Central European Summer Time)
...
info: .env.local file format
info:
----------------------- COPY START ----------------------
NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON='{"url":"XXX","algolia":{"appId":"XXX","apiKey":"XXX"},"cms":{"hub":"XXX","stagingApi":"XXX","imageHub":"XXX"}}'
------------------------ COPY END -----------------------
info:
info: Vercel format
info:
----------------------- COPY START ----------------------
{"url":"XXX","algolia":{"appId":"XXX","apiKey":"XXX"},"cms":{"hub":"XXX","stagingApi":"XXX","imageHub":"XXX"}}
------------------------ COPY END -----------------------
...
info: run completed in [ 1m47s ]
```

Once ran, you will be provided with your own specific value for the `NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON` environment variable to replace in both your `.env.local` file and in your Vercel deployment environment variable.

> Notes:
>
> -   If you ever need to revert, simply run the `cleanup` command.
> -   If you choose not to supply Algolia credentials they will be omitted from this value.

## Change dc-demostore-core Config / Point to your account

In the [Fork and Deploy](#fork--deploy-dc-demostore-core) section you will have already created your local environment variable and the same on your vercel deployment.

We just need to change `NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON` to the outputs from the `dc-demostore-cli` import for both local and in Vercel (Settings --> Environment Variables)

The outputs for both are in friendly copy and paste formats, see below for more details.

### Local

In your `.env.local` at the root of the project replace the current line of `NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON` with your item from the automation. (.env.local file format)

> Note: Reloading your page in development mode should be enough to take the new values into account.

### Vercel

In your Vercel project browse to Settings --> Environment Variables and edit the existing `NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON` variable and replace the value with that from the `dc-demostore-cli` import. (Vercel format)

> Note: You will have to redeploy your application to see the change.

[top](#table-of-content)

## Additional Topics

-   [Features Highlights](docs/FeatureHighlights.md)
-   [Image Studio](docs/DeepDive.md#image-studio)
-   [High-Level Architecture](docs/ArchDiagram.md)
-   [Available Components](docs/Components.md)
-   [Exploring features](docs/DeepDive.md)
-   [Changing eCommerce Configuration](docs/ECommerceConfiguration.md)
-   [Working with Pages](docs/WorkingWithPages.md)
-   [Blogs](docs/Blogs.md)
-   [Automated Video Captions](docs/AutomatedVideoCaptions.md)
-   [Debug / X-Ray Panel](docs/Debug-Xray-Panel.md)
-   [Contribution Model (fork, PR, etc.)](https://github.com/amplience/dc-cli/blob/master/CONTRIBUTING.md)
-   [FAQ](docs/FAQ.md)
-   Upgrades:
    -   [v4.0.0 Upgrade](docs/v4.0.0-upgrade.md)
    -   [v3.0.0 Upgrade](docs/v3.0.0-upgrade.md)

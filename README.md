# short

> A short url service hosted on TCB.

## Getting Started

[![](https://main.qcloudimg.com/raw/95b6b680ef97026ae10809dbd6516117.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2Fzce%2Fshort-tcb&branch=master&appName=short)

## Local Development

### Clone

```shell
$ git clone https://github.com/zce/short-tcb.git
```

### Install

```shell
$ cd short-tcb
$ npm install
```

### Environment

```shell
$ cp .env.example .env
$ vi .env
```

- `ENV_ID`: your tencent cloudbase env id
- `SECRET_ID`: your tencent secret id
- `SECRET_KEY`: your tencent secret key

### Running

```shell
$ npm run dev
```

### Deploy

[![](https://main.qcloudimg.com/raw/95b6b680ef97026ae10809dbd6516117.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2Fzce%2Fshort-tcb&branch=master&appName=short)

## Related

- [zce/short](https://github.com/zce/short) - A short url service hosted on Vercel.

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [zce](https://zce.me)

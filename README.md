# 小步清单

我的第一个 GitHub 作品：一个可以添加、完成、筛选和删除待办事项的小网页。清单保存在浏览器的本地存储中，刷新页面也会保留。

## 运行方法

直接用浏览器打开 `index.html`。无需安装依赖，也无需运行服务器。

## 文件说明

- `index.html`：网页的内容与结构。
- `style.css`：颜色、排版和手机屏幕适配。
- `script.js`：添加、完成、筛选、删除和本地保存。

## 第一次上传到 GitHub

以下命令在 Ubuntu 终端中运行。命令前面的 `$` 提示符不需要输入。

### 1. 准备 GitHub 账号和 Git 身份

如果还没有 GitHub 账号，先注册并验证邮箱。然后在终端设置自己的名字和提交邮箱：

```bash
git --version
git config --global user.name "你的名字"
git config --global user.email "你在 GitHub 验证过的邮箱"
git config --global --get user.name
git config --global --get user.email
```

这两个配置用于标记提交者；它们本身不会替你登录 GitHub。如果不想公开邮箱，可以在 GitHub 的邮箱设置中启用隐私邮箱，并将 `user.email` 设为 GitHub 提供的 `noreply` 地址。

### 2. 配置 SSH 身份验证（每台电脑通常只需一次）

先检查电脑上是否已有准备使用的 SSH 公钥：

```bash
ls ~/.ssh/*.pub
```

如果没有，生成新密钥。把注释邮箱换成你的 GitHub 邮箱；提示保存位置时按 Enter 使用默认路径，按提示设置密钥口令：

```bash
ssh-keygen -t ed25519 -C "你在 GitHub 验证过的邮箱"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
```

如果默认位置已有密钥，不要覆盖它。可以使用已有公钥，或另选文件名并在 `ssh-add` 与 `cat` 命令里使用对应路径。

复制 `cat` 输出的**整行公钥**，在 GitHub 右上角头像 → **Settings** → **SSH and GPG keys** → **New SSH key** 中添加。不要复制或公开没有 `.pub` 后缀的私钥。随后运行：

```bash
ssh -T git@github.com
```

首次连接时核对 GitHub 官方公布的 SSH 主机指纹，再确认信任。验证成功时，GitHub 会显示包含你的用户名的问候消息。

### 3. 创建空仓库并提交作品

在 GitHub 网页上点击 **New repository**，仓库名称填写 `hello-github`，选择 Public 或 Private。**不要勾选**初始化 README、`.gitignore` 或 License，因为这个文件夹已经有 README。

在终端进入作品文件夹，初始化本地仓库并保存第一次提交：

```bash
cd "/home/zyb/Desktop/vibe coding/hello-github"
git init -b main
git status
git add .
git commit -m "完成第一个待办清单"
```

在 GitHub 的新仓库页面选择 **SSH**，复制仓库地址，把下面命令的地址换成你复制的地址：

```bash
git remote add origin git@github.com:你的用户名/hello-github.git
git remote -v
git push -u origin main
```

刷新仓库页面，看到 `index.html`、`style.css`、`script.js`、`README.md` 四个文件即上传成功。

### 4. 以后每次修改

```bash
git status
git add .
git commit -m "说明本次修改内容"
git push
```

`git status` 查看改动，`git add .` 把当前目录的改动放入暂存区，`git commit` 在本地保存版本，`git push` 将版本上传到 GitHub。

> 不要把密码、密钥或私人文件加入 Git 仓库。`git add .` 前先用 `git status` 检查文件。

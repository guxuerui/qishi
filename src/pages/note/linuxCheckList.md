---
title: Linux 命令行速查表
abstract: 全面的Linux命令行速查表，涵盖文件管理、SSH、搜索等多个类别，适用于 Linux 用户日常操作和查询。。
tags: note
date: 2024-08-06
chipColor: teal
---

# Linux 命令行速查表

## 文件命令

- `ls`: 目录列表
- `ls -l`: 长列表格式
- `ls -a`: 列出所有文件，包括隐藏文件
- `cd /path/to/directory`: 更改目录
- `pwd`: 显示当前工作目录
- `mkdir directory_name`: 创建新目录
- `rmdir directory_name`: 删除空目录
- `rm file_name`: 删除文件
- `rm -r directory_name`: 递归删除目录及其内容
- `touch file_name`: 创建或更新文件
- `cat file_name`: 连接并显示文件内容
- `more file_name`: 逐页查看文件内容
- `less file_name`: 改进版的 'more'，查看文件内容
- `cp source_file target_file`: 从源复制文件到目标
- `mv old_name new_name`: 重命名或移动文件/目录

## SSH（安全外壳协议）

- `ssh user@host`: 作为用户连接到主机
- `ssh -p port user@host`: 使用特定端口连接
- `ssh-keygen`: 生成 RSA 密钥对
- `ssh-copy-id user@host`: 将你的密钥复制到远程服务器以实现无密码登录

## 搜索

- `grep pattern files`: 在文件中搜索模式
- `grep -r pattern dir`: 在目录中递归搜索模式
- `find /dir -name name*`: 在目录中查找以名字开头的文件
- `locate file_name`: 使用数据库查找文件名

## 进程管理

- `ps`: 显示当前活跃的进程
- `ps aux | grep process_name`: 查找名为 process_name 的进程
- `top`: 显示所有运行中的进程
- `kill pid`: 根据给定的 pid 杀死进程
- `killall process_name`: 杀死所有名为 process_name 的进程
- `bg`: 列出停止或后台作业；恢复后台停止的作业
- `fg`: 将最近的作业带到前台

## 文件权限

- `chmod 755 file_name`: 使文件可执行
- `chmod 775 file_name`: 为所有者设置读和执行权限，为其他用户设置读权限
- `chown user:group file_name`: 更改文件的所有者和组

## 网络

- `ifconfig`: 显示所有网络接口和 ip 地址
- `ping host`: 向主机发送 ICMP 回显请求
- `traceroute host`: 显示数据包到网络主机的路由
- `netstat -tulnp`: 显示监听端口及其应用程序

## 归档和压缩

- `tar cf archive_name.tar files`: 创建一个名为 archive_name.tar 的 tar 归档，包含文件
- `tar xf archive_name.tar`: 从 archive_name.tar 中提取文件
- `gzip file_name`: 压缩文件并将其重命名为 file.gz
- `gunzip file_name.gz`: 解压 file.gz 并将其还原

## 系统信息与管理

- `uname -a`: 显示系统和内核信息
- `df -h`: 以人类可读的形式显示空闲磁盘空间
- `du -sh directory_name`: 以人类可读的形式显示目录的磁盘使用情况
- `free -m`: 以 MB 为单位显示空闲和已用内存

## 包管理（Debian/Ubuntu）

- `sudo apt-get update`: 更新包列表索引
- `sudo apt-get upgrade`: 升级所有包
- `sudo apt-get install package_name`: 安装包

## 文本编辑器

- `nano file_name`: 在 nano 编辑器中打开文件
- `vim file_name`: 在 vim 编辑器中打开文件

## 杂项命令

- `man command_name`: 显示命令手册
- `echo "text"`: 在屏幕上显示消息
- `date`: 显示当前日期和时间
- `uptime`: 显示系统已运行时间

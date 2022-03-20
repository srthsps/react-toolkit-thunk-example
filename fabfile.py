import os

from fabric import Connection, Config, task

DEV_HOST_URL = os.environ['ENFONO_DEV_SERVR']
DEV_HOST_USER = 'ubuntu'
DEV_HOST_PASSWORD = os.environ['ENFONO_DEV_PASSWORRD']

PROJECT_ROOT = '/home/ubuntu/b2b-web'
DEV_BRANCH = 'master'

@task
def install_fe_requirements(c):
    c.run(
        'cd {} && npm install --production'.format(PROJECT_ROOT))

@task
def build_app(c):
    c.run(
        'cd {} && npm run build'.format(PROJECT_ROOT))

@task
def restart_all(c):
    c.sudo('service nginx restart', pty=True, warn=True)

@task
def deploy(context):
    c = Connection(DEV_HOST_URL, user=DEV_HOST_USER,
                   connect_kwargs={'password': DEV_HOST_PASSWORD})
    c.config = Config(
        overrides={'sudo': {'password': DEV_HOST_PASSWORD}})
    c.run('cd {} && git pull origin {}'.format(
        PROJECT_ROOT, DEV_BRANCH))
    install_fe_requirements(c)
    build_app(c)
    restart_all(c)

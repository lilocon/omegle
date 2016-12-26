<?php

namespace Deployer;
server('flower', '47.90.15.72')
    ->user('root')
    ->identityFile('~/.ssh/id_rsa.pub', '~/.ssh/id_rsa', 'leoyang')
    ->set('deploy_path', '/room/omegle')
;



task('deploy', function () {
    runLocally('git pull');
    runLocally('rsync -rtDvz --progress --exclude=.git ./ root@{{server.host}}:{{deploy_path}}');
    run('rm -rf app/cache/* && echo OK');
});
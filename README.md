# react create component <digitalrcc>
create react component from command line

# install : npm i -g digitalrcc;

use: digitalrcc name -e js -p -s css -d -r ;

use 2: digitalrcc name -e -S -s -d;


# params:

# -alias  --fullname<required> [optional]  'discription'  'default'

'-e, --ext <type>', 'extention of file', 'js';

'-p, --pureC [type]', 'extends with PureComponent', false;

'-s, --style [type]', 'include (or)css file';

'-d, --dir', 'create new directory', false;

'-r, --withRedux', 'file with redux', false;

'-S, --stateless', 'stateless component', false;


#update v1.1.1
- lifecycle hooks added

#update v1.1.3
- lifecycle issue fixed and commented

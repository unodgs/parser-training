grammar Calculator;

init: expr EOF;

expr: left=DIGIT operation=(ADD | SUB) right=DIGIT #AddSub
;

ADD : '+';
SUB : '-';
DIGIT : [0-9]+('.'[0-9]+)?;
WS : [ \t\r\n]+ -> channel(HIDDEN);

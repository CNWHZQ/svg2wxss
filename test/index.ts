import template from "art-template";
console.log(template);
var render = template.compile('hi, <%=value%>.',{escape: false});
console.log(render);
var html = render({value: '"aui"'});
console.log(html);
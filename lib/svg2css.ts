export default function (txt:string):string {
  return 'data:image/svg+xml,' + (txt
  .replace('<svg', (txt.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'))
  .replace(/"/g, '\'')
  .replace(/%/g, '%25')
  .replace(/#/g, '%23')
  .replace(/{/g, '%7B')
  .replace(/}/g, '%7D')
  .replace(/</g, '%3C')
  .replace(/>/g, '%3E')
  .replace(/\s+/g, ' '));
}
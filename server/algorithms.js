// Binary heaps and graph algorithms used by the allocation engine.
export class MaxHeap {
  constructor(items = []) { this.a=[]; for(const x of items)this.insert(x); }
  higher(x,y) { return x.priority===y.priority ? x.createdAt<y.createdAt : x.priority>y.priority; }
  insert(x) { this.a.push(x); let i=this.a.length-1; while(i){const p=(i-1)>>1;if(this.higher(this.a[p],x))break;this.a[i]=this.a[p];i=p;}this.a[i]=x; }
  peek(){return this.a[0]??null;}
  extractMax(){if(!this.a.length)return null;const top=this.a[0],last=this.a.pop();if(this.a.length){this.a[0]=last;let i=0;while(true){let l=2*i+1,r=l+1,b=i;if(l<this.a.length&&this.higher(this.a[l],this.a[b]))b=l;if(r<this.a.length&&this.higher(this.a[r],this.a[b]))b=r;if(b===i)break;[this.a[i],this.a[b]]=[this.a[b],this.a[i]];i=b;}}return top;}
  toArray(){return [...this.a].sort((x,y)=>y.priority-x.priority);}
}
export class MinHeap { constructor(){this.a=[];} push(x){this.a.push(x);let i=this.a.length-1;while(i){let p=(i-1)>>1;if(this.a[p][0]<=x[0])break;this.a[i]=this.a[p];i=p;}this.a[i]=x;} pop(){if(!this.a.length)return null;let t=this.a[0],v=this.a.pop();if(this.a.length){let i=0;while(2*i+1<this.a.length){let c=2*i+1;if(c+1<this.a.length&&this.a[c+1][0]<this.a[c][0])c++;if(this.a[c][0]>=v[0])break;this.a[i]=this.a[c];i=c;}this.a[i]=v;}return t;} }
export const locations=['A','B','C','D','E','F'];
export const roads=[['A','B',5],['B','C',4],['A','D',3],['B','E',6],['C','F',2],['D','E',4],['E','F',5],['A','E',7]];
export function shortestPath(source,destination){const g=Object.fromEntries(locations.map(x=>[x,[]]));for(const [a,b,d] of roads){g[a].push([b,d]);g[b].push([a,d]);}const dist=Object.fromEntries(locations.map(x=>[x,Infinity])),prev={};dist[source]=0;const q=new MinHeap();q.push([0,source]);while(q.a.length){const [d,u]=q.pop();if(d!==dist[u])continue;for(const [v,w]of g[u])if(d+w<dist[v]){dist[v]=d+w;prev[v]=u;q.push([dist[v],v]);}}let path=[];for(let v=destination;v;v=prev[v]){path.unshift(v);if(v===source)break;}return {distance:dist[destination],path:path[0]===source?path:[]};}
export const score=e=>+(0.5*e.severity+0.3*e.urgency+0.2*e.waiting).toFixed(2);
export const category=p=>p>=8.5?'Critical':p>=7?'High':p>=5?'Medium':'Low';

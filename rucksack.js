$.fn.rucksack = function(options){
	options = options || {}
	var self = this, els = self.children(), b = parseInt(options.width,10) || 960, cl = options.class || 'rucksack';
	function knapsack(a, b){
		for(var k = 1; k <= a.length; k++)
			for (var y = 1; y <= b; y++)
				if (y < $(a[k-1]).outerWidth())
					knap[k][y-1] = knap[k-1][y-1];
				else if (y > $(a[k-1]).outerWidth())
					knap[k][y-1] = Math.max(knap[k-1][y-1], knap[k-1][y-1-$(a[k-1]).outerWidth()] + 1);
				else
					knap[k][y-1] = Math.max(knap[k-1][y-1], 1);
		return knap[a.length][b-1];
	};

	function findKnap(knap, b, a){
		k = a.length;
		var soln = new Array(k);
		for (var j = 0; j < k; j++)
			soln[j] = 0
		while (k > 0) {
			while(k > 0 && knap[k-1][b-1] == knap[k][b-1])
				k--;
			soln[k-1] = 1;
			b -= $(a[k-1]).outerWidth();
			k--;
		}
		return soln;
	};

	var knap

	function init(a, b){
		knap = new Array(a.length+1);
		var i, found = -1, soln, div;
		for(i = 0; i < a.length + 1; i++)
			knap[i] = new Array(b)
		for(i = 0; i < b; i++)
			knap[0][i] = 0;
		knapsack(a, b);
		soln = findKnap(knap, b, a);
		div = $('<div class="'+cl+'"></div')
		for(i = soln.length - 1; i >= 0; i--)
			if(1 === soln[i]){
				div.append(a[i])
				a.splice(i,1)
				found++;
			}
		self.get(0).insertBefore(div.get(0), self.get(0).lastChild.nextSibling);
		if(-1 !== found && a.length)
			init(a, b)
	}
	init(els, b)
}
(function (root, factory) {
	if (typeof define === 'function' && define.amd)
		define(factory);
	else if (typeof exports === 'object')
		module.exports = factory();
	else
		root.Mark = factory();
})(this, function () {
	var notMarked = {
		acceptNode: function (node) {
			return node.parentNode.nodeName != 'MARK';
		}
	};

	function Mark(root, query, options) {
		if (root instanceof Node) {
			if (typeof query == 'string' && query.length) {
				var doc = root.ownerDocument,
					textNodes = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, notMarked, false),
					exp = expression(query, options || {}),
					matches = [],
					match;

				while (textNodes.nextNode())
					while (match = exp.exec(textNodes.currentNode.textContent))
						matches.push({
							node: textNodes.currentNode,
							index: match.index,
							length: exp.lastIndex - match.index
						});

				while (match = matches.pop()) {
					var target = match.node.splitText(match.index),
						markEl = doc.createElement('mark');

					target.splitText(match.length);
					target.parentNode.insertBefore(markEl, target);
					markEl.appendChild(target);
				}

				return Array.apply(0, root.querySelectorAll('mark'));
			} else {
				Array.apply(0, root.querySelectorAll('mark')).forEach(function (mark) {
					mark.parentNode.replaceChild(mark.firstChild, mark);
				});
				root.normalize();
			}
		}
	}

	function expression(query, options) {
		query = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

		if (options.separate)
			query = '(' + query.split(/\s+/g).filter(Boolean).join('|') + ')';

		if (options.mode == Mark.INCLUSIVE_MATCH)
			query = '\\w*' + query + '\\w*';

		if (options.mode == Mark.EXACT_MATCH)
			query = '\\b' + query + '\\b';

		return new RegExp(query, 'gi');
	};

	Mark.EXCLUSIVE_MATCH = 0;
	Mark.INCLUSIVE_MATCH = 1;
	Mark.EXACT_MATCH = 2;

	return Object.freeze(Mark);
});
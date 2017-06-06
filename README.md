# micromark.js
A small utility to highlight text in a browser

#### Syntax
    Mark(root[, query, options]);
    
#### Parameters
- `root`: Required. Container element to search/highlight.
- `query`: Optional. String to search for. If `query` is a non-zero length string the function will mark matching text in the `root` element, otherwise it will unmark text.
- `options`: Optional. A dictionary object to supply options.

#### Options
- `mode`: Sets the text matching mode. Default is 0. The `mode` value can be set using the provided constants:
  - `Mark.EXCLUSIVE_MATCH = 0`: Only matched text will be highlighted.
  - `Mark.INCLUSIVE_MATCH = 1`: Entire word will be highlighted if it contains a match.
  - `Mark.EXACT_MATCH = 2`: Entire word will be highlighted if it an exact match.
- `separate`: Boolean value that flags whether to use search each word in the query as a single phrase or individually. Default is false.
 
#### Return Value
If the function is called to mark text it will return an array of `mark` elements, otherwise the return value is undefined.

#### Usage
    // mark all occurrences of 'and'
    var marks = Mark(document.body, 'and');
    
    // unmark
    Mark(document.body);
    
    // mark all occurrences of words containing 'and'
    Mark(document.body, 'and', { mode: Mark.INCLUSIVE_MATCH});
    
    // mark all occurrences of the word 'the'
    Mark(document.body, 'the', { mode: Mark.EXACT_MATCH });
    
    // mark all occurrences of multiple words by exact match
    Mark(document.body, 'the and yellow', { mode: Mark.EXACT_MATCH, separate: true });

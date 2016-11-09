# istanbul-lcov-issue

Demonstrates how lcov reporting crashes when a file is changed in the middle of a test,
and the new lines are covered.

The issue is **intermittent**.  In my experience it happens rougly 80% of the time.

**It seems the bug only happens when transpiling with the `es2015` and `stage-1` presets --
if I remove them I no longer see the bug.**

Just `npm install && npm test`, and you should see:

```
$ npm test

> istanbul-lcov-issue@ test /Users/andy/istanbul-lcov-issue
> NODE_ENV=coverage nyc --reporter=lcov --reporter=text mocha ./test/index.js



  lcov reporter
{ hello: 'world' }
{ hello: 'world' }
{ hello: 'world' }
    ✓ works for file that changes during test (4315ms)


  1 passing (4s)

/Users/andy/istanbul-lcov-issue/node_modules/nyc/node_modules/istanbul-reports/lib/lcovonly/index.js:32
        writer.println('FN:' + [meta.decl.start.line, meta.name].join(','));
                                    ^

TypeError: Cannot read property 'decl' of undefined
    at /Users/andy/istanbul-lcov-issue/node_modules/nyc/node_modules/istanbul-reports/lib/lcovonly/index.js:32:37
    at Array.forEach (native)
    at LcovOnlyReport.onDetail (/Users/andy/istanbul-lcov-issue/node_modules/nyc/node_modules/istanbul-reports/lib/lcovonly/index.js:30:28)
    at LcovReport.(anonymous function) [as onDetail] (/Users/andy/istanbul-lcov-issue/node_modules/nyc/node_modules/istanbul-reports/lib/lcov/index.js:21:24)
    at Visitor.(anonymous function) [as onDetail] (/Users/andy/istanbul-lcov-issue/node_modules/nyc/node_modules/istanbul-lib-report/lib/tree.js:34:30)
    at ReportNode.Node.visit (/Users/andy/istanbul-lcov-issue/node_modules/nyc/node_modules/istanbul-lib-report/lib/tree.js:123:17)
    at /Users/andy/istanbul-lcov-issue/node_modules/nyc/node_modules/istanbul-lib-report/lib/tree.js:116:23
    at Array.forEach (native)
    at visitChildren (/Users/andy/istanbul-lcov-issue/node_modules/nyc/node_modules/istanbul-lib-report/lib/tree.js:115:32)
    at ReportNode.Node.visit (/Users/andy/istanbul-lcov-issue/node_modules/nyc/node_modules/istanbul-lib-report/lib/tree.js:126:5)
npm ERR! Test failed.  See above for more details.
```

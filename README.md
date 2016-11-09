# istanbul-lcov-issue

Demonstrates how lcov reporting crashes when a file is changed in the middle of a test,
and the new lines are covered.

**It seems the bug only happens when transpiling with the `es2015` and `stage-1` presets --
if I remove them I no longer see the bug.**

Just `npm install && npm test`!

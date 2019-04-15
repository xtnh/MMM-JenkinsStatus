# MMM-JenkinsStatus
Module for MagicMirror to display Jenkins job status

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```javascript
modules: [
	{
		module: "MMM-JenkinsStatus",
		position: "top_right",
		config: {
			title: "Linker mainline",
			url: "https://jenkins.mono-project.com/job/test-linker-mainline/lastBuild/api/json"
		}
	}
]
```

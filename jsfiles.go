package wajaf

import (
	"embed"
	"io/fs"
)

//go:embed js
var jsfiles embed.FS

func GetJSFile(path string) []byte {

	// Directories
	dirs := []string{
		"js/system/",
		"js/managers/",
		"js/containers/",
		"js/elements/",
	}

	for _, d := range dirs {
		data, err := fs.ReadFile(jsfiles, d+path)
		if err == nil {
			return data
		}
	}
	return nil
}

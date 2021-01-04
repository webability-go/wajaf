package main

import (
	"github.com/webability-go/xcore/v2"

	"github.com/webability-go/xamboo/assets"
)

func Run(ctx *assets.Context, template *xcore.XTemplate, language *xcore.XLanguage, e interface{}) interface{} {

	params := &xcore.XDataset{
		//		"#": language,
	}

	return template.Execute(params)
}

func Myform(ctx *assets.Context, template *xcore.XTemplate, language *xcore.XLanguage, e interface{}) interface{} {

	return "{}"
}

package main

import (
	"github.com/webability-go/xcore/v2"

	"github.com/webability-go/xamboo/cms/context"
)

func Run(ctx *context.Context, template *xcore.XTemplate, language *xcore.XLanguage, e interface{}) interface{} {

	params := &xcore.XDataset{
		//		"#": language,
	}

	return template.Execute(params)
}

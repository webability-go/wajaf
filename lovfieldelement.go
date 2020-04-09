package wajaf

type LOVFieldElement NodeDef

func NewLOVFieldElement(id string, data string) LOVFieldElement {

	e := NewNode("element", "lovfieldElement")
	e.SetID(id)
	e.SetData(data)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom",
		"size", "visible", "info", "disabled", "readonly", "notnull", "helpmode"})
	//	e.RegisterKnownMessages([]string{"defaultvalue", "helpdescription", "statusnotnull", "statuscheck"})

	return e
}

/*
namespace wajaf;

class lovfieldElement extends Xelement
{
  protected $Options = null;

  public function __construct($id = null, $text = null)
  {
    parent::__construct("lovfieldElement");
    $this->registerAttributes( array("size", "visible", "info", "disabled", "readonly", "notnull", "helpmode") );
    $this->registerPossibleMessages( array("defaultvalue", "helpdescription", "statusnotnull", "statuscheck") );
    $this->setId($id);
    $this->setData($text);
  }

  public function setOptions($options)
  {
    $this->Options = $options;
  }

  protected function compilelocal()
  {
    $txt = "";
    if ($this->Options)
    {
      $txt .= "<options>";
      foreach($this->Options as $k => $m)
        $txt .= "<option key="".htmlentities($k, ENT_COMPAT, "UTF-8").""><![CDATA[".$m."]]></option>";
      $txt .= "</options>";
    }
    return $txt;
  }
}
*/

package wajaf

type FileFieldElement NodeDef

func NewFileFieldElement(id string) FileFieldElement {

	e := NewNode("element", "filefieldElement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}

/*
namespace wajaf;

class filefieldElement extends Xelement
{
  private $ExtensionsImages = array('.gif', '.jpg', '.png');
  private $ExtensionsAudios = array('.mp3', '.wma');
  private $ExtensionsVideos = array('.mp4', '.avi', '.wmv', '.mov');
  private $ExtensionsDocuments = array('.pdf', '.doc', '.xls', '.ppt', '.zip', '.txt', '.csv');

  private $ExtensionsAuth = null;
  private $ExtensionsDir = '/skins/clean/extensions/'; // directory where the extensions gifs are
  private $ExtensionsOther = 'other.png';       // put a gif link if we accept other extensions, or NULL if not

  public function __construct($id = null)
  {
    parent::__construct('filefieldElement');
//    $this->registerAttributes( array('classnameover', 'classnamedown', 'classnamedisabled', 'action', 'link') );

    $this->setId($id);
//    $this->registerData($text);
  }

  public function setExtensions($auth, $dir, $other = null)
  {
    if ( is_string($auth) )
    {
      switch($auth)
      {
        case 'images': $this->ExtensionsAuth = $this->ExtensionsImages; break;
        case 'audios': $this->ExtensionsAuth = $this->ExtensionsAudios; break;
        case 'videos': $this->ExtensionsAuth = $this->ExtensionsVideos; break;
        case 'documents': $this->ExtensionsAuth = $this->ExtensionsDocuments; break;
        default: $this->ExtensionsAuth = null; break;
      }
    }
    else
      $this->ExtensionsAuth = $auth;
    $this->ExtensionsDir = $dir;
    $this->ExtensionsOther = $other;
  }

  public function getExtension($name)
  {
    if ($this->ExtensionsAuth)
    {
      foreach ($this->ExtensionsAuth as $ext)
      {
        if (strtolower(substr($name, -strlen($ext))) == $ext)
        {
          return $ext;
        }
      }
    }
    if ($this->ExtensionsOther)
    {
      $pos = strrpos($name,'.');
      if ($pos === false)
        return null;
      return substr($name, $pos);
    }
    return null;
  }

  // returns the gif of the extensionm or null
  public function getExtensionImage($extension)
  {
    if ($this->ExtensionsAuth && in_array($extension, $this->ExtensionsAuth))
      return substr($extension,1).'.png';
    return substr($extension,1).'.png';
    return $this->ExtensionsOther;
  }

  public function processFile($temporarydir, $temporarypath)
  {
    $Context = $this->base->HTTPRequest->getParameter('ApplicationContext');

    $tempname = $this->base->createKey(10);
    $extension = $this->getExtension(strtolower($_FILES[$this->getId()]['name']));
    $id = $this->getId();
    if ($extension)
    {
      // 1. save the file in a temporary public directory
      DB_File::createDirectory($temporarydir, $temporarypath);
      move_uploaded_file($_FILES[$this->getId()]['tmp_name'], $temporarydir . $temporarypath . $tempname . $extension);
      // 2. return the javascript to show this file, and keep the name in a temporary field
      $gif = $this->getExtensionImage($extension);
      $tempfullname = $tempname.$extension;
      $truefullname = $_FILES[$this->getId()]['name'];

      return <<<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript">
<!--

window.parent.\$E('$Context{$id}').setFile('{$this->ExtensionsDir}', '$gif', '$tempfullname', '$truefullname');

// -->
</script>
</head>
</html>
EOF;
    }
    else
    {
      // 2. return the javascript to notify error
      return <<<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript">
<!--

window.parent.\$E('$Context{$id}').setFile('/pics/', 'dot.gif', null, null);
alert('Error: el archivo que subió no es un archivo autorizado.');

// -->
</script>
</head>
</html>
EOF;
    }
  }

}

*/

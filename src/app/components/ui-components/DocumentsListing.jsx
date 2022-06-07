import React, {useState} from 'react'

function DocumentsListing({documents}) {
    const [currentDirectory, setCurrentDirectory] = useState(documents);
    const [currentFolder, setCurrentFolder] = useState({});
    const [breadCrumbs, setBreadCrumbs] = useState([{pid:0, cid:0, pname:"Documents"}]);
    const onDirectoryClick = (id) =>{
        let currentFolder =currentDirectory.find((item)=>(item.id === id))
        setCurrentFolder(currentFolder);
        setCurrentDirectory(currentFolder.children_files);
        let newObj = {cid:currentFolder.id, pid:currentFolder.parent_id, pname:currentFolder.name}
        setBreadCrumbs([...breadCrumbs, newObj ]);
    }
    
    const onBreadCrumbClick = (crumb, index) =>{
        if(crumb.cid === 0){
            setCurrentFolder({});
            setCurrentDirectory(documents);
            setBreadCrumbs([ breadCrumbs[0]]);
        }else{
            if(currentFolder.id !== crumb.pid){
                let toFolder;
                documents.forEach(document => {
                    // console.log(document, crumb.cid);
                    if(document.id === crumb.cid){
                        toFolder = document;
                    }else{
                        toFolder = traverse(document.children, crumb.cid);
                    }
    
                });
                setCurrentFolder(toFolder);
                setCurrentDirectory(toFolder.children_files);
                // console.log(breadCrumbs.splice(index, breadCrumbs.length));
                setBreadCrumbs(breadCrumbs.slice(0, (index + 1)));
            }
        }
    }

    const traverse = (childern, id) =>{
        let arr = null;
        childern.every(document => {
            if(document.id === id){
                arr = document;
            }else{
                arr = traverse(document.children, id);
                
            }

            if(arr !== null){
                return false;
            }
            return true;
        });
        return arr;
    }

  return (
    <div className="ebs-document-module">
                <ul style={{listStyle:"none"}}>
                    {
                        breadCrumbs.map((crumb, i) => (
                            <li key={i} style={{display: "inline-block", marginLeft: "10px"}} onClick={()=>{onBreadCrumbClick(crumb, i);}} >{crumb.pname}</li>
                        ))
                    }
                </ul>
              <div className="ebs-document-header">
                <div className="row d-flex align-items-center">
                  <div className="col-6 col-sm-8 col-lg-9">
                    <h6>Name <i className="material-icons">arrow_downward</i></h6>
                  </div>
                  <div className="col-6 col-sm-4 col-lg-3">
                    <h6>Modified</h6>
                  </div>
                </div>
              </div>
                
              {currentDirectory && currentDirectory.length > 0 &&
                currentDirectory.map((item, i)=>(
                <div key={i} className="ebs-document-content">
                    <div className="row d-flex align-items-center">
                    <div className="col-6 col-sm-8 col-lg-9">
                        <div className="ebs-title" onClick={()=>{ onDirectoryClick(item.id) }} ><i className="material-icons">folder</i>{item.name}</div>
                    </div>
                    <div className="col-6 col-sm-4 col-lg-3">
                        <div className="ebs-date"><span>16-04-2022  10:56 <i className="material-icons">file_download</i></span></div>
                    </div>
                    </div>
                </div>
                ))
              }
    </div>
  )
}

export default DocumentsListing
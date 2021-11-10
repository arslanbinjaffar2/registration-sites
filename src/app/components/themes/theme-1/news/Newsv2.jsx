import React, { Component } from 'react'

export default class Newsv2 extends Component {
  state = {
    sidebar: false
  }
  render() {
    const {sidebar} = this.state
    return (
      <div style={{paddingTop: '80px'}} className='edgtf-container'>
       <div className="edgtf-container-inner">
         <div className={`${sidebar ? 'edgtf-two-columns-75-25' : 'edgtf-full-width-inner'} clearfix`}>
           <div className="edgtf-column1 edgtf-content-left-from-sidebar">
            <div className="edgtf-column-inner">
              <div className="edgtf-blog-holder edgtf-blog-type-standard">
                {/* List */}
                <article>
                  {/* for Image */}
                  <div className="edgtf-post-content">
                    <div className="edgtf-post-image">
                      <a itemProp="url" href="#!">
                        <img src="https://via.placeholder.com/1500x500.png" className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                      </a>
                    </div>
                  {/* For Image Close */}
                  {/* Content Post */}
                  <div className="edgtf-post-text">
                    <div className="edgtf-post-text-inner">
                      <h3 itemProp="name" className="entry-title edgtf-post-title">
                        <a itemProp="url" href="#!" title="Web Analytics Made Easy">Web Analytics Made Easy</a>
                      </h3> 
                      <div className="edgtf-post-info">
                        <div itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                          March 3, 2016
                        </div> 
                      </div>
                      <p itemProp="description" className="edgtf-post-excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus fuga consectetur sequi at officia assumenda deleniti, aperiam excepturi enim tempora exercitationem! Suscipit impedit accusamus odio!</p> 
                      <div style={{marginBottom: 40}} className="edgtf-post-info-bottom"></div>
                    </div>
                  </div>
                  {/* Content Post Close */}
                  </div>
                </article>
                {/* List End */}
                {/* List */}
                <article>
                  {/* for Image */}
                  <div className="edgtf-post-content">
                    <div className="edgtf-post-image">
                      <a itemProp="url" href="#!">
                        <img src="https://via.placeholder.com/1500x500.png" className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                      </a>
                    </div>
                  {/* For Image Close */}
                  {/* Content Post */}
                  <div className="edgtf-post-text">
                    <div className="edgtf-post-text-inner">
                      <h3 itemProp="name" className="entry-title edgtf-post-title">
                        <a itemProp="url" href="#!" title="Web Analytics Made Easy">Web Analytics Made Easy</a>
                      </h3> 
                      <div className="edgtf-post-info">
                        <div itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                          March 3, 2016
                        </div> 
                      </div>
                      <p itemProp="description" className="edgtf-post-excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus fuga consectetur sequi at officia assumenda deleniti, aperiam excepturi enim tempora exercitationem! Suscipit impedit accusamus odio!</p> 
                      <div style={{marginBottom: 40}} className="edgtf-post-info-bottom"></div>
                    </div>
                  </div>
                  {/* Content Post Close */}
                  </div>
                </article>
                {/* List End */}
                {/* List */}
                <article>
                  {/* for Image */}
                  <div className="edgtf-post-content">
                    <div className="edgtf-post-image">
                      <a itemProp="url" href="#!">
                        <img src="https://via.placeholder.com/1500x500.png" className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                      </a>
                    </div>
                  {/* For Image Close */}
                  {/* Content Post */}
                  <div className="edgtf-post-text">
                    <div className="edgtf-post-text-inner">
                      <h3 itemProp="name" className="entry-title edgtf-post-title">
                        <a itemProp="url" href="#!" title="Web Analytics Made Easy">Web Analytics Made Easy</a>
                      </h3> 
                      <div className="edgtf-post-info">
                        <div itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                          March 3, 2016
                        </div> 
                      </div>
                      <p itemProp="description" className="edgtf-post-excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus fuga consectetur sequi at officia assumenda deleniti, aperiam excepturi enim tempora exercitationem! Suscipit impedit accusamus odio!</p> 
                      <div style={{marginBottom: 40}} className="edgtf-post-info-bottom"></div>
                    </div>
                  </div>
                  {/* Content Post Close */}
                  </div>
                </article>
                {/* List End */}
                {/* List */}
                <article>
                  {/* for Image */}
                  <div className="edgtf-post-content">
                    <div className="edgtf-post-image">
                      <a itemProp="url" href="#!">
                        <img src="https://via.placeholder.com/1500x500.png" className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                      </a>
                    </div>
                  {/* For Image Close */}
                  {/* Content Post */}
                  <div className="edgtf-post-text">
                    <div className="edgtf-post-text-inner">
                      <h3 itemProp="name" className="entry-title edgtf-post-title">
                        <a itemProp="url" href="#!" title="Web Analytics Made Easy">Web Analytics Made Easy</a>
                      </h3> 
                      <div className="edgtf-post-info">
                        <div itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                          March 3, 2016
                        </div> 
                      </div>
                      <p itemProp="description" className="edgtf-post-excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus fuga consectetur sequi at officia assumenda deleniti, aperiam excepturi enim tempora exercitationem! Suscipit impedit accusamus odio!</p> 
                      <div style={{marginBottom: 40}} className="edgtf-post-info-bottom"></div>
                    </div>
                  </div>
                  {/* Content Post Close */}
                  </div>
                </article>
                {/* List End */}
                {/* List */}
                <article>
                  {/* for Image */}
                  <div className="edgtf-post-content">
                    <div className="edgtf-post-image">
                      <a itemProp="url" href="#!">
                        <img src="https://via.placeholder.com/1500x500.png" className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                      </a>
                    </div>
                  {/* For Image Close */}
                  {/* Content Post */}
                  <div className="edgtf-post-text">
                    <div className="edgtf-post-text-inner">
                      <h3 itemProp="name" className="entry-title edgtf-post-title">
                        <a itemProp="url" href="#!" title="Web Analytics Made Easy">Web Analytics Made Easy</a>
                      </h3> 
                      <div className="edgtf-post-info">
                        <div itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                          March 3, 2016
                        </div> 
                      </div>
                      <p itemProp="description" className="edgtf-post-excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus fuga consectetur sequi at officia assumenda deleniti, aperiam excepturi enim tempora exercitationem! Suscipit impedit accusamus odio!</p> 
                      <div style={{marginBottom: 40}} className="edgtf-post-info-bottom"></div>
                    </div>
                  </div>
                  {/* Content Post Close */}
                  </div>
                </article>
                {/* List End */}
                {/* List */}
                <article>
                  {/* for Image */}
                  <div className="edgtf-post-content">
                    <div className="edgtf-post-image">
                      <a itemProp="url" href="#!">
                        <img src="https://via.placeholder.com/1500x500.png" className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                      </a>
                    </div>
                  {/* For Image Close */}
                  {/* Content Post */}
                  <div className="edgtf-post-text">
                    <div className="edgtf-post-text-inner">
                      <h3 itemProp="name" className="entry-title edgtf-post-title">
                        <a itemProp="url" href="#!" title="Web Analytics Made Easy">Web Analytics Made Easy</a>
                      </h3> 
                      <div className="edgtf-post-info">
                        <div itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                          March 3, 2016
                        </div> 
                      </div>
                      <p itemProp="description" className="edgtf-post-excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus fuga consectetur sequi at officia assumenda deleniti, aperiam excepturi enim tempora exercitationem! Suscipit impedit accusamus odio!</p> 
                      <div style={{marginBottom: 40}} className="edgtf-post-info-bottom"></div>
                    </div>
                  </div>
                  {/* Content Post Close */}
                  </div>
                </article>
                {/* List End */}
                {/* List */}
                <article>
                  {/* for Image */}
                  <div className="edgtf-post-content">
                    <div className="edgtf-post-image">
                      <a itemProp="url" href="#!">
                        <img src="https://via.placeholder.com/1500x500.png" className="attachment-full size-full wp-post-image" alt="a" width="1500" height="500" />
                      </a>
                    </div>
                  {/* For Image Close */}
                  {/* Content Post */}
                  <div className="edgtf-post-text">
                    <div className="edgtf-post-text-inner">
                      <h3 itemProp="name" className="entry-title edgtf-post-title">
                        <a itemProp="url" href="#!" title="Web Analytics Made Easy">Web Analytics Made Easy</a>
                      </h3> 
                      <div className="edgtf-post-info">
                        <div itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                          March 3, 2016
                        </div> 
                      </div>
                      <p itemProp="description" className="edgtf-post-excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus fuga consectetur sequi at officia assumenda deleniti, aperiam excepturi enim tempora exercitationem! Suscipit impedit accusamus odio!</p> 
                      <div style={{marginBottom: 40}} className="edgtf-post-info-bottom"></div>
                    </div>
                  </div>
                  {/* Content Post Close */}
                  </div>
                </article>
                {/* List End */}
              </div>
            </div>
           </div>
           {sidebar && <div className="edgtf-column2">
             <div className="edgtf-sidebar">
               <h4 className="edgtf-widget-title">Sidebar</h4>
             </div>
           </div>}
         </div>
       </div>
      </div>
    )
  }
}

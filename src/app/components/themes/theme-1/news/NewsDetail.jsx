import React, { Component } from 'react';
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon
} from "react-share";

export default class NewsDetail extends Component {
  state = {
    sidebar: true
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
                  <div className="blog-post-social">
                  <FacebookIcon size={32} round={true}  />
                  <TwitterIcon size={32} round={true}  />
                  <LinkedinIcon size={32} round={true}  />
                  <EmailIcon size={32} round={true}  />
                  </div>
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
                      <h2 itemProp="name" className="entry-title edgtf-post-title">
                        <a itemProp="url" href="#!" title="Web Analytics Made Easy">Web Analytics Made Easy</a>
                      </h2> 
                      <div className="edgtf-post-info">
                        <div style={{fontSize: 15}} itemProp="dateCreated" className="edgtf-post-info-date entry-date updated">
                          March 3, 2016
                        </div> 
                      </div>
                      <div style={{marginBottom: 40,marginTop: 0}} className="edgtf-post-info-bottom"></div>
                      <p itemProp="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, voluptatum debitis eligendi quaerat ex consequuntur unde dolores autem voluptatem nostrum quod minima ipsa asperiores voluptatibus optio dolorem, commodi eveniet atque.</p> 
                      <p itemProp="description"><strong>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, debitis.</strong></p> 
                      <p itemProp="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore voluptas eum perspiciatis consectetur ipsam laudantium atque dolores vero eveniet accusantium eaque recusandae asperiores enim beatae odit, <br /> suscipit quo eligendi, harum corporis modi eos ab? Soluta nobis quisquam voluptatem recusandae, ratione aut. Magnam neque quasi aperiam veritatis minima sit illum fugiat?</p> 
                      <p itemProp="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias fuga temporibus dolorum porro, quam magnam optio laboriosam. Odit ab ipsum voluptate natus nulla quas, fugiat unde dolores quasi ut odio. Veniam, fuga. Soluta esse ipsam fuga quibusdam voluptatum possimus reiciendis sapiente incidunt aperiam, consequuntur doloribus suscipit cumque quisquam dolore consectetur assumenda totam aut repudiandae quod adipisci eveniet corrupti quaerat praesentium! <br /> Non quis debitis quas illo aliquam iusto iure, eius temporibus obcaecati at quod iste ratione atque voluptate? Quis earum quidem odio optio! Tempora, voluptatem natus, optio officiis soluta cumque consectetur ea tenetur unde sapiente quaerat facilis neque, iste cupiditate repellat ipsam doloribus commodi aut! Cupiditate ducimus blanditiis, nostrum laudantium est reprehenderit quaerat omnis nam ea velit molestias consequatur minima reiciendis?</p> 
                      <p itemProp="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae impedit fugiat obcaecati repellendus ratione voluptatem magnam laboriosam, iure reiciendis voluptates. A aliquam laboriosam deserunt alias eligendi asperiores quo magni ullam nobis ipsam quidem, laborum, odio exercitationem tempora obcaecati totam. Quod debitis tempora doloribus quidem sint? Ipsam enim quibusdam quis nihil natus? Debitis libero laborum provident fugiat facilis iure nihil culpa ipsa quam voluptatum eligendi, dolores ad modi enim ab repellendus suscipit minus, eveniet labore ducimus nulla quia! Eum alias quibusdam placeat ipsa accusamus officia quas, ducimus molestias, praesentium, rem aspernatur.</p> 
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

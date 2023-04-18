const apiRoot = 'http://localhost/omarochoa-backend-wp/wp-json',
	  articleContainer = document.querySelector('main'),
	  listPosts = {};

      console.log(articleContainer);

/** init - Initialize the listing of posts */
listPosts.init = function() {

	let request = new XMLHttpRequest();

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    let posts = JSON.parse(request.responseText);
			listPosts.clearPosts();
			listPosts.render( posts );
	  } else {
	    console.log( request );
	  }
	};

	request.onerror = function() {
	  console.log( 'An error has occured' );
	};

	request.open('GET', apiRoot + '/wp/v2/posts', true);

	request.send();

};
listPosts.init();


/** Display posts on the page */
listPosts.render = function( posts ) {
	for ( let post of posts ) {
		listPosts.renderPost( post );
	}
};


/** Displays an individual post on the page */
listPosts.renderPost = function( post ) {

  const article = document.createElement( 'article' ),
		title = listPosts.getTitleMarkup( post ),
		content = listPosts.getContentMarkup( post );

	article.classList.add('post');
	article.appendChild( title );
	article.appendChild( content );
	articleContainer.appendChild(article);

};


/** Get the markup for a post title */
listPosts.getTitleMarkup = function( post ) {

	const titleEl = document.createElement( 'h2' ),
			titleLinkEl = document.createElement( 'a' ),
			title = document.createTextNode( post.title.rendered );

	titleEl.classList.add('entry-title');
	titleLinkEl.appendChild( title );
	titleLinkEl.href = post.link;
	titleLinkEl.target = '_blank';
	titleEl.appendChild( titleLinkEl );

	return titleEl;

};


/** Get the markup for post content */
listPosts.getContentMarkup = function( post ) {
	const contentEl = document.createElement( 'div' ),
			content = document.createTextNode('');

	contentEl.classList.add('entry-content');
	contentEl.appendChild( content );
	contentEl.innerHTML = post.content.rendered;

	return contentEl;

};


/** clearPosts - Clear posts from page */
listPosts.clearPosts = function() {
		articleContainer.innerHTML = '';
};

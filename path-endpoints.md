======================= PATHS FOR A MVP VERSION ======================
FRONTEND PATHS:
	Home								/
	Sign in								/signin
	Sign up								/signup
	Sign out							/signout
	Forget pwd							/forget
	Contact	us							/contact
	About								/about


	STORIES:
		Story Index (All Stories)		/stories

		All Columns 					/stories/columns 
		Column Index					/stories/:column-slug
		
		Story Page						/stories/:column-slug/:story-slug


	USER:
		Public Profile					/@:username 
		Public stories					/@:username/stories
		Public upvotes					/@:username/upvotes


OWNER PATHS:
	Owner's stories						/me/stories 
	Owner's drafts						/me/stories/drafts

	Owner's profile setting				/me/settings 
	Owner's account setting				/me/settings/account


EDITOR PATHS:
	Overall Dashboard						/editor
	Publisher Contact and About				/editor/contact 
	Publisher Settings						/editor/settings 
	
	EDITOR STORY SECTION:
		Editor Published Stories			/editor/stories 					?sort=recent / trending / popular
																				?column=columnid
		New Story 							/editor/stories/new 				The story belongs to the publisher
																				So, it can be edited by editor of which column the story submitted.
																				Published story must have a column, but the draft isn't required.
																				So, editor can only edit a draft that's already choosen the column.
		Edit Story 							/editor/stories/:storyid/edit  		Edit the story, granted only for owner, editor of this column, admin
																				All drafted/published/scheduled stories can be edited.
		Editor Drafted Stories 				/editor/stories/drafts
		Column Settings 					/editor/columns/:column-id/settings
		// Column create is a popup

		

=================== SERVICE ENDPOINTS FOR MVP VERSION ================
// TODO


====================== PATHS FOR A FULL VERSION ======================

FRONTEND PATHS:
	Home								/
	Sign in								/signin
	Sign up								/signup
	Sign out							/signout
	Forget pwd							/forget
	Contact	us							/contact
	About								/about
	Advertise with us 					/advertise
	Terms and Privacies					/terms


	STORIES:
		Story Index (All Stories)		/stories

		All Columns 					/stories/columns 
		Column Index					/stories/:column-slug
		Column Followers				/stories/:column-slug/followers
		
		Story Page						/stories/:column-slug/:story-slug


	VIDEOS:
		Video Index (All Videos)		/videos

		All Programs					/videos/programs
		Program Index					/videos/:program-slug
		Program Followers				/videos/:program-slug/followers

		Video Page						/vidoes/:program-slug/:video-slug


	QA:
		QA Index (All QA)				/qa

		All topics						/qa/topics
		Topic Index						/qa/:topic-slug
		Topic Followers					/qa/:topic-slug/followers

		QA Page							/qa/:topic-slug/:qa-slug


	TAG:
		Tag Page 						/tags/:tag-slug


	USER:
		Public Profile					/@:username 
		Public stories					/@:username/stories
		Public upvotes					/@:username/upvotes
		Public followings				/@:username/followings
		Public followers				/@:username/followers


OWNER PATHS:
	Owner's bookmarks					/me/bookmarks						including story, vdo, QA

	Owner's stories						/me/stories 
	Owner's drafted stories				/me/stories/drafts
	Owner's scheduled stories			/me/stories/schedules

	Owner's videos						/me/videos 
	Owner's drafted videos				/me/videos/drafts
	Owner's scheduled videos			/me/videos/schedules

	Owner's questions					/me/qa == /me/questions
	Owner's answers						/me/qa/answers						QA is able to be drafted as well

	Owner's profile setting				/me/settings 
	Owner's account setting				/me/settings/account



EDITOR PATHS:
	Overall Dashboard						/editor
	Publisher Contact and About				/editor/contact 
	Publisher Settings						/editor/settings 
	Send Message 							/editor/message
	
	EDITOR STORY SECTION:
		Editor Published Stories			/editor/stories 					?sort=recent / trending / popular
																				?find=keyword
																				?column=columnid
		New Story 							/editor/stories/new 				The story belongs to the publisher
																				So, it can be edited by editor of which column the story submitted.
																				Published story must have a column, but the draft isn't required.
																				So, editor can only edit a draft that's already choosen the column.
		Edit Story 							/editor/stories/:storyid/edit  		Edit the story, granted only for owner, editor of this column, admin
																				All drafted/published/scheduled stories can be edited.
		Editor Drafted Stories 				/editor/stories/drafts
		Editor Scheduled Stories 			/editor/stories/schedules
		Column Dashboard (Future)			/editor/columns
		Column Settings 					/editor/columns/:column-id/settings
		// Column create is a popup


	EDITOR QA SECION: 
		Editor Published Questions			/editor/questions					?sort=recent / trending / popular / unanswered
																				?find=keyword
																				?topic=qid
		New Question 						/editor/questions/new 				The question belongs to the publisher.
																				So, it can be edited by editor of which topic the question submitted.
																				Question cannot be drafted or scheduled.
		Edit Question 						/editor/questions/:qid/edit  		Edit the question, granted only for owner, editor of this topic, admin.
		Topic Dashboard (Future)			/editor/topics 
		Topic Settings 						/editor/topics/:topic-id/settings
		// Topic create is a popup


	EDITOR VIDEO SECION: 
		Editor Published Videos				/editor/videos 						?sort=recent / trending / popular
																				?find=keyword
																				?program=programid
		New Video 							/editor/videos/new 					The video belongs to the publisher
																				So, it can be edited by editor of which column the story submitted.
																				Published video must have a topic, but the draft isn't required.
																				So, editor can only edit a draft that's already choosen the topic.
		Edit Video 							/editor/videos/:vid/edit  			Edit the video, granted only for owner, editor of this column, admin
																				All drafted/published/scheduled videos can be edited.
		Editor Drafted Videos				/editor/videos/drafts
		Editor Scheduled Videos 			/editor/videos/schedules
		Program Dashboard (Future)			/editor/topics
		Program Settings 					/editor/topics/:topic-id/settings
		// Program create is a popup
	
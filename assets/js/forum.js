// alert();

/* Initial users data */
let users = [
    {
        "id" : 1667236813037,
        "first_name" : "Jhaver",
        "last_name" : "Gurtiza",
        "email" : "jgurtiza@village88.com",
        "password" : "Jhaver!",
        "is_login" : false,
    },
    {
        "id" : 1667236957704,
        "first_name" : "Demy",
        "last_name" : "Balanza",
        "email" : "dbalanza@village88.com",
        "password" : "Demy!",
        "is_login" : false,
    },
];

/* Initial topics data */
let topics = [
    {
        "id" : "T1667245796787",
        "user_id" : 1667236813037,
        "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum nec feugiat massa adipiscing. Sit at placerat nisi, sed lorem porttitor nulla aliquam fermentum. Mi curabitur consequat congue consectetur erat sed.",
        "responses" : ["R1667245997169"],
        "created_at" : "01/01/2022"
    },
    {
        "id" : "T1667245912317",
        "user_id" : 1667236957704,
        "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum nec feugiat massa adipiscing. Sit at placerat nisi, sed lorem porttitor nulla aliquam fermentum. Mi curabitur consequat congue consectetur erat sed.",
        "responses" : ["R1667246114222", "R1667246152061", "R1667246199546"],
        "created_at" : "01/01/2022"
    }
];

/* Initial responses data */
let responses = [
    {
        "id" : "R1667245997169",
        "user_id" : "1667236813037",
        "content" : "That is a great prototype",
        "responses" : [],
        "created_at" : "01/01/2022"
    },
    {
        "id" : "R1667246114222",
        "user_id" : "1667236957704",
        "content" : "I agree on that",
        "responses" : [],
        "created_at" : "01/01/2022"
    },
    {
        "id" : "R1667246152061",
        "user_id" : "1667236813037",
        "content" : "Awesome prototype",
        "responses" : [],
        "created_at" : "01/01/2022"
    },
    {
        "id" : "R1667246199546",
        "user_id" : "1667236957704",
        "content" : "The UX is amazing",
        "responses" : [],
        "created_at" : "01/01/2022"
    }
];



window.onload = function() {

    document.querySelector(".login_btn").addEventListener("click", switchLoginPage);            /* To switch to login page */
    document.querySelector(".signup_btn").addEventListener("click", switchToSighupPage);        /* To switch to signup page */
    document.querySelector("#signup_form").addEventListener("submit", submitSignupForm);        /* To submit signup form */
    document.querySelector("#login_form").addEventListener("submit", submitLoginForm);          /* To submit login forms */
    document.querySelector("#forum_post_form").addEventListener("submit", postTopic);           /* To post a new topic */
    document.querySelector(".close_modal_btn").addEventListener("click", closeForumModal);      /* To close forum modal */
    document.querySelector("#response_form").addEventListener("submit", postResponse)           /* To post a new response */
};
/**
 * DOCU: To switch to login page 
 * Triggered: On click to login button
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function switchLoginPage() {
    document.querySelector("#login_container").setAttribute("class", "signup_login_container");
    document.querySelector("#signup_container").setAttribute("class", "signup_login_container hidden");
}

/**
 * DOCU: To switch to signup page
 * Triggered: On click to signup button
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function switchToSighupPage() {
    document.querySelector("#login_container").setAttribute("class", "signup_login_container hidden");
    document.querySelector("#signup_container").setAttribute("class", "signup_login_container");
}

/**
 * DOCU: To submit signup form
 * Triggered: On submit to signup form
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function submitSignupForm(e) {
    e.preventDefault();
    
    let signup_input = document.querySelectorAll(".signup_input");

    /* To validate signup inputs */
    for(let signup_input_index = 0; signup_input_index < signup_input.length; signup_input_index++) {

        let signup_input_value = signup_input[signup_input_index].value;
        (signup_input_value == "") ? signup_input[signup_input_index].setAttribute("class", "signup_input validation_error") : signup_input[signup_input_index].setAttribute("class", "signup_input");
    };

    /* To submit signup data */
    let validation_error = document.querySelectorAll(".validation_error");
    if(validation_error.length == 0) {
        let submit_signup_form_btn = document.querySelector("#signup_form").querySelector("button");
        
        submit_signup_form_btn.setAttribute("class", "processing_btn");
        submit_signup_form_btn.querySelector("span").textContent = "Processing...";

        setTimeout(() => {
            submit_signup_form_btn.setAttribute("class", "");
            submit_signup_form_btn.querySelector("span").textContent = "Signup";

            document.querySelector("#forum_dashboard").setAttribute("class", "");
            document.querySelector("#signup_container").setAttribute("class", "signup_login_container hidden");

            updateUserloginData();
            displayAllTopics();
        }, 3000);

        /* To add new user data */
        let new_user = {
            "id" : Date.now(),
            "first_name" : document.querySelector("#first_name_input").value,
            "last_name" : document.querySelector("#last_name_input").value,
            "email" : document.querySelector("#email_input").value,
            "password" : document.querySelector("#password_input").value,
            "is_login" : true
        };
        
        users.push(new_user);
    };
};

/**
 * DOCU: To submit login forms
 * Triggered: On submit to login form
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function submitLoginForm(e) {
    e.preventDefault();
    
    let email_login_input           = document.querySelector("#email_login_input");
    let password_login_input        = document.querySelector("#password_login_input");
    let email_index = users.findIndex(item => item.email === email_login_input.value)

    /* To check email validation */
    if(email_index == -1) {
        email_login_input.setAttribute("class", "login_input validation_error");
        password_login_input.setAttribute("class", "login_input validation_error");
    }
    else {
        email_login_input.setAttribute("class", "login_input");

        /* To check password validation */
        let user_data_password = users[email_index].password;
        if(password_login_input.value == user_data_password) {
            password_login_input.setAttribute("class", "login_input");

            let submit_login_form_btn = document.querySelector("#login_container").querySelector("button")
            submit_login_form_btn.setAttribute("class", "processing_btn");
            submit_login_form_btn.querySelector("span").textContent = "Processing..."

            users[email_index].is_login = true;

            setTimeout(() => {
                submit_login_form_btn.setAttribute("class", "");
                submit_login_form_btn.querySelector("span").textContent = "Signup";
    
                document.querySelector("#forum_dashboard").setAttribute("class", "");
                document.querySelector("#login_container").setAttribute("class", "signup_login_container hidden");

                updateUserloginData();
                displayAllTopics();
            }, 3000);
        }
        else {
            password_login_input.setAttribute("class", "login_input validation_error");
        }
    }
}

/**
 * DOCU: To update user login data on dashboard
 * Triggered: On user login/signup
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function updateUserloginData() {
    let login_user_index  = users.findIndex(item => item.is_login === true);
    let login_profile_initials = document.querySelectorAll(".login_profile_initials");
    let login_user_first_name  = users[login_user_index].first_name;
    let login_user_last_name = users[login_user_index].last_name;

    document.querySelector(".profile_name").textContent = login_user_first_name + " " + login_user_last_name;
    document.querySelector(".profile_greeting").textContent = login_user_first_name + ","

    for(let login_profile_initials_index = 0; login_profile_initials_index < login_profile_initials.length ; login_profile_initials_index++) {
        login_profile_initials[login_profile_initials_index].textContent = login_user_first_name.charAt(0) + login_user_last_name.charAt(0);
    };
}

/**
 * DOCU: To display all topcis on the dashboard
 * Triggered: On user login/signup
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function displayAllTopics() {

    getLoginUserData();

    for(let topic_index = 0; topic_index < topics.length; topic_index++) {
        
        let forum_topic_item_clone      = document.querySelector("#clone_container").querySelector(".forum_topic_item").cloneNode(true);
        let forum_topic_list            = document.querySelector("#forum_topic_list");
        let user_id                     = topics[topic_index].user_id;
        let user_index                  = users.findIndex(item => item.id === user_id);

        forum_topic_item_clone.querySelector("p").textContent = topics[topic_index].content;
        forum_topic_item_clone.querySelector("button").setAttribute("id", topics[topic_index].id);
        forum_topic_item_clone.querySelector(".response_info").textContent = (topics[topic_index].responses).length + " Responses";
        forum_topic_item_clone.querySelector(".topic_profile").textContent = users[user_index].first_name + " " + users[user_index].last_name + " (" + topics[topic_index].created_at + ")";
        forum_topic_item_clone.querySelector(".profile_initial").textContent = users[user_index].first_name.charAt(0) + users[user_index].last_name.charAt(0);
       
        /* To prepend all topics */
        forum_topic_list.insertBefore(forum_topic_item_clone, forum_topic_list.children[0]);
    }
}

/**
 * DOCU: To post a new topic
 * Triggered: On submit to forum post form
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function postTopic(e) {
    e.preventDefault();

    let topic_textarea = document.querySelector("#topic_textarea");

    if(topic_textarea.value == "") {
        topic_textarea.setAttribute("class", "validation_error");
    }
    else {
        /* To get new topic data */
        let new_topic = {
            "id" : "T" + Date.now(),
            "user_id" : is_login_user_id,
            "content" : topic_textarea.value,
            "responses" : [],
            "created_at" : new Date().toLocaleDateString()
        }

        topics.push(new_topic);

        /* To display new topic */
        document.querySelector("#forum_topic_list").replaceChildren();
        displayAllTopics();

        /* To reset topic form */
        this.reset();
        topic_textarea.setAttribute("class", "");
    }
}

/**
 * DOCU: To get user login data
 * Triggered: On posting a topic/reponse
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function getLoginUserData() {
    let is_login_user_index     = users.findIndex(item => item.is_login === true);
    is_login_user_first_name    = users[is_login_user_index].first_name;
    is_login_user_last_name     = users[is_login_user_index].last_name;
    is_login_user_id            = users[is_login_user_index].id;
}

/**
 * DOCU: To open forum modal
 * Triggered: On click to topics
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function showForumModal(clicked_id) {
    let forum_modal = document.querySelector("#forum_modal");
    forum_modal.setAttribute("class", "");

    let topic_id            = clicked_id ;
    let topic_index         = topics.findIndex(item => item.id === topic_id);
    let topic_user_id       = topics[topic_index].user_id
    let topic_user_index    = users.findIndex(item => item.id === topic_user_id)
    let topic_responses     = topics[topic_index].responses;

    /* To display topic data */
    forum_modal.querySelector("h2").textContent = topics[topic_index].content ;
    forum_modal.querySelector("h3").textContent = (topics[topic_index].responses).length + " Responses";
    forum_modal.querySelector(".profile_initial").textContent = users[topic_user_index].first_name.charAt(0) + users[topic_user_index].last_name.charAt(0);
    forum_modal.querySelector(".topic_profile").textContent = users[topic_user_index].first_name + " " + users[topic_user_index].last_name + " (" + topics[topic_index].created_at +")";

    let forum_response_list = document.querySelector("#forum_response_list");
    forum_response_list.replaceChildren();
    
    for(let topic_response_data_index = 0; topic_response_data_index < topic_responses.length; topic_response_data_index++) {

        /* To clone response tempplate */
        let forum_response_item_clone = document.querySelector("#clone_container").querySelector(".forum_response_item").cloneNode(true);

        /* To get response data */
        let response_id = topic_responses[topic_response_data_index];
        let response_index = responses.findIndex(item=> item.id === response_id);
        let response_user_id = responses[response_index].user_id;
        let response_content = responses[response_index].content;
        let response_created_at = responses[response_index].created_at;
        let response_user_index = users.findIndex(item=> item.id === parseInt(response_user_id));
        
        let response_user_first_name = users[response_user_index].first_name;
        let response_user_last_name = users[response_user_index].last_name;
        let response_user_initials = response_user_first_name.charAt(0) + response_user_last_name.charAt(0);

        /* To display response data */
        forum_response_item_clone.querySelector("p").textContent = response_content;
        forum_response_item_clone.querySelector(".profile_initial").textContent = response_user_initials;
        forum_response_item_clone.querySelector(".topic_profile").textContent = response_user_first_name + " " + response_user_last_name + " (" + response_created_at + ")";
        forum_modal.setAttribute("data-topic-id", topic_id);

        /* To append responses */
        forum_response_list.appendChild(forum_response_item_clone);
    }
}

/**
 * DOCU: To close forum modal
 * Triggered: On click to close modal btn
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function closeForumModal() {
    document.querySelector("#forum_modal").setAttribute("class", "hidden");
}

/**
 * DOCU: To post a new response
 * Triggered: On submit to response form
 * last Updated Date: October 31, 2022
 * @author Jhaver G.
 */
function postResponse(e) {
    e.preventDefault();

    let response_textarea = this.querySelector("#response_textarea");
    
    if(response_textarea.value == "") {
        response_textarea.setAttribute("class", "validation_error");
    }
    else {

        getLoginUserData();
        let forum_response_item_clone           = document.querySelector("#clone_container").querySelector(".forum_response_item").cloneNode(true);
        let forum_response_list                 = document.querySelector("#forum_response_list");
        let new_response_id                     = "R" +  Date.now();

        forum_response_item_clone.querySelector(".profile_initial").textContent = is_login_user_first_name.charAt(0) + is_login_user_last_name.charAt(0);
        forum_response_item_clone.querySelector(".topic_profile").textContent = is_login_user_first_name + " " + is_login_user_last_name + " (" + new Date().toLocaleDateString() + ")";
        forum_response_item_clone.querySelector("p").textContent = response_textarea.value;

        forum_response_list.appendChild(forum_response_item_clone);

        /* To push response data */
        let new_response = {
            "id" : new_response_id,
            "user_id" : is_login_user_id,
            "content" : response_textarea.value,
            "responses" : [],
            "created_at" : new Date().toLocaleDateString()
        };

        responses.push(new_response);

        let data_topic_id = document.querySelector("#forum_modal").getAttribute("data-topic-id");
        let data_topic_index = topics.findIndex(item => item.id === data_topic_id);
        topics[data_topic_index].responses.push(new_response_id);
        document.querySelector("#forum_modal").querySelector("h3").textContent = "Responses (" + topics[data_topic_index].responses.length + ")";

        /* To reset the response form */
        response_textarea.setAttribute("class", "");
        this.reset();

    }


}
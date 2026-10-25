(function () {
  "use strict";

  var log = document.getElementById("chatLog");
  var form = document.getElementById("chatForm");
  var input = document.getElementById("chatInput");
  var sendBtn = document.getElementById("chatSend");
  var suggestions = document.getElementById("chatSuggestions");
  if (!log || !form) return;

  var history = [];            // [{role: "user"|"assistant", content: "..."}]
  var MAX_HISTORY = 10;
  var busy = false;

  var QUESTIONS = [
    "Who are you?",
    "What are your skills?",
    "What projects have you completed?",
    "What was corrected in the buggy code project?",
    "How does the reading list work?",
    "Where is your GitHub?"
  ];

  function addMessage(text, cls) {
    var d = document.createElement("div");
    d.className = "msg " + cls;
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }

  function setBusy(b) {
    busy = b;
    sendBtn.disabled = b;
    input.disabled = b;
    if (!b) input.focus();
  }

  async function ask(question) {
    if (busy || !question.trim()) return;
    question = question.trim();
    addMessage(question, "user");
    var typing = addMessage("Thinking…", "bot typing");
    setBusy(true);

    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 30000);

    try {
      var res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.concat([{ role: "user", content: question }]) }),
        signal: controller.signal
      });

      var data = null;
      try { data = await res.json(); } catch (e) { /* non-JSON response */ }

      if (!res.ok || !data || !data.reply) {
        var msg = (data && data.error) || ("The chatbot service returned an error (" + res.status + ").");
        throw new Error(msg);
      }

      typing.remove();
      addMessage(data.reply, "bot");
      history.push({ role: "user", content: question });
      history.push({ role: "assistant", content: data.reply });
      history = history.slice(-MAX_HISTORY);
    } catch (err) {
      typing.remove();
      var text = err.name === "AbortError"
        ? "The request took too long. Please try again."
        : (err instanceof TypeError
            ? "Could not reach the chatbot. Check your internet connection and try again."
            : err.message);
      addMessage("Sorry, something went wrong: " + text, "error");
    } finally {
      clearTimeout(timer);
      setBusy(false);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = input.value;
    input.value = "";
    ask(q);
  });

  QUESTIONS.forEach(function (q) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = q;
    b.addEventListener("click", function () { ask(q); });
    suggestions.appendChild(b);
  });

  addMessage("Hi! Ask me anything about this portfolio: my skills, projects, or how to contact me.", "bot");
})();


const local = {
  set: function(name) {
    window.history.pushState(null, name, '#/' + name);
  },
  name: function() {
    let name = window.location.hash.substr(2);
    if (!name.length) return;
    name = name[0].toUpperCase() + name.substr(1);
    return name;
  }
}

export default local;
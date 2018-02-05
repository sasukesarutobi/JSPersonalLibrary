var _EasySendData = {};

_EasySendData.METHOD_GET = "GET";
_EasySendData.METHOD_POST = "POST";

_EasySendData.TARGET_BLANK = "_blank";
_EasySendData.TARGET_SELF = "_self";
_EasySendData.TARGET_PARENT = "_parent";
_EasySendData.TARGET_TOP = "_top";

_EasySendData.create = function(){
	newObject = {};

	newObject.setMethod = function(_method){
		this.method = _method;
	}

	newObject.getMethod = function(){
		return this.method;
	}

	newObject.setAction = function(_action){
		this.action = _action;
	}

	newObject.getAction = function(){
		return this.action;
	}

	newObject.setTarget = function(_target){
		this.target = _target;
	}

	newObject.getTarget = function(){
		return this.target;
	}

	newObject.addValue = function(_name,_value){
		if(!this.values){
			this.values = [];
		}
	
		value = {};
		value.name = _name;
		value.value = _value;
	
		this.values.push(value);
	}

	newObject.removeValue = function(_name){
		if(this.values){
			deleteIndex = -1;
			for(index in this.values){
				if(this.values[index].name == _name){
					deleteIndex = index;
					break;
				}
			}
			if(deleteIndex!=-1){
				this.values.splice(deleteIndex,1);
			}		
		}
	
	}

	newObject.send = function(){
		if(!this.values){
			throw "There is no values";
		}
	
		if(!this.action){
			throw "Action is not set";
		}
	
		if(!this.method){
			this.setMethod(this.METHOD_POST);
		}
	
		if(!this.target){
			this.setTarget(this.TARGET_SELF);
		}
	
		sender = document.createElement("form");
		sender.setAttribute("method",this.method);
		sender.setAttribute("action",this.action);
		sender.setAttribute("target",this.target);
		for(value of this.values){
			field = document.createElement("input");
			field.setAttribute("type","hidden");
			field.setAttribute("name",value.name);
			field.setAttribute("value",value.value);
			sender.appendChild(field);
		}
		document.body.appendChild(sender);
		sender.submit();
		
	}
	return newObject;
}
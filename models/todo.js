module.exports = (sequelize, DataTypes) => {
	let Todo = sequelize.define("Todo", {
		text: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len:[1,140]
			}
		},
		complete: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		}
	});
	return Todo;
}
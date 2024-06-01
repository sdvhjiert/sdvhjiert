

            //分页
            handleSizeChange(val) {
                // 重新设置每页显示的条数
                this.pageSize  = val;
                this.selectAll();
            },
            handleCurrentChange(val) {
                // 重新设置当前页码
                this.currentPage  = val;
                this.selectAll();
            },

            // 删除
            deleteById(index, row){

                // 弹出确认提示框

                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //用户点击确认按钮

                    //2. 发送AJAX请求
                    var _this = this;

                    // 发送ajax请求，添加数据
                    axios({
                        method:"post",
                        url:"http://localhost:8080/brand-case/brand/deleteById",
                        data:row.id
                    }).then(function (resp) {
                        if(resp.data == "success"){
                            //删除成功

                            // 重新查询数据
                            _this.selectAll();
                            // 弹出消息提示
                            _this.$message({
                                message: '恭喜你，删除成功',
                                type: 'success'
                            });

                        }
                    })
                }).catch(() => {
                    //用户点击取消按钮

                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });




            },

            updateById(index, row) {
                this.brand.id = row.id;
                this.centerVisible = true;
            },
            //修改数据的部分内容
            edit() {
                var _this = this;
                //发送ajax异步请求，添加数据
                axios({
                    method: "post",
                    url: "http://localhost:8080/brand-case/brand/updateById",
                    data: _this.brand
                }).then(function (resp) {
                    if (resp.data == "success") {
                        //关闭窗口
                        _this.centerVisible = false;
                        //查询一次
                        _this.selectAll();
                        _this.$message({
                            message: '恭喜你，修改数据成功',
                            type: 'success'
                        });
                    } else {
                        _this.$message.error('修改数据失败');
                    }
                })
            },

            // 批量删除
            deleteByIds(){

                // 弹出确认提示框

                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //用户点击确认按钮

                    //1. 创建id数组 [1,2,3], 从 this.multipleSelection 获取即可
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        let selectionElement = this.multipleSelection[i];
                        this.selectedIds[i] = selectionElement.id;

                    }

                    //2. 发送AJAX请求
                    var _this = this;

                    // 发送ajax请求，添加数据
                    axios({
                        method:"post",
                        url:"http://localhost:8080/brand-case/brand/deleteByIds",
                        data:_this.selectedIds
                    }).then(function (resp) {
                        if(resp.data == "success"){
                            //删除成功

                            // 重新查询数据
                            _this.selectAll();
                            // 弹出消息提示
                            _this.$message({
                                message: '恭喜你，删除成功',
                                type: 'success'
                            });

                        }
                    })
                }).catch(() => {
                    //用户点击取消按钮

                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });




            }

        },

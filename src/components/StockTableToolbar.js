import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'

import Alert from './Alert'

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight: theme.palette.type === 'light'
    ? {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85)
    }
    : {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.dark
    },

  spacer: {
    flex: '1 1 100%'
  },
  title: {
    flex: '0 0 auto'
  },
  actions: {
    color: theme.palette.text.secondary
  }
})

class EnhancedTableToolbar extends Component {
  static propTypes = {
    selectedCount: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired
  }

  state = {
    confirmOpen: false
  }

  openConfirm = () => this.setState({ confirmOpen: true })

  closeConfirm = () => this.setState({ confirmOpen: false })

  render () {
    const { selectedCount, classes, onDeleteClick } = this.props
    const { confirmOpen } = this.state
    return (
      <Toolbar className={classNames(classes.root, {
        [classes.highlight]: selectedCount > 0
      })}>
        <Alert
          open={confirmOpen}
          onClose={this.closeConfirm}
          onConfirm={onDeleteClick}
          title={`Really delete ${selectedCount} items ?`}
          description='Once confirmed, you cannot retrieve the lost data. Blah blah blah...'
        />
        <div className={classes.title}>
          {selectedCount > 0 ? (
            <Typography color='inherit' variant='subheading'>
              {selectedCount} selected
            </Typography>
          ) : (
            <Typography variant='title'>
              Items
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {selectedCount > 0 ? (
            <Tooltip title='Delete'>
              <IconButton aria-label='Delete' onClick={this.openConfirm}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            null
          )}
        </div>
      </Toolbar>
    )
  }
}

export default withStyles(styles)(EnhancedTableToolbar)
